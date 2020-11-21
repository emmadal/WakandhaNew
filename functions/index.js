const functions = require('firebase-functions');

const paypal = require('paypal-rest-sdk');
const admin = require('firebase-admin');
const OpenTok = require('opentok');

admin.initializeApp();

const opentok = new OpenTok(
  '46866234',
  'e638fd50f79cc5bfc6b86b53aa003ae783cdf5f5',
);

paypal.configure({
  mode: 'live',
  client_id:
    'ATBhgj62cmpPVMr0fAfX85u4Afv0_rEQbl6SLM2GeUsjvulhd_8GnS9R-1FtTZPMvlJFqft3MDXuH-hW', // run: firebase functions:config:set paypal.client_id="yourPaypalClientID"
  client_secret:
    'EFl4CspS5NtwoRT9BivFFG-nvgty9S8HJS6KrOn1ollcNPC68GesZDBuCx1qLJolhfDwJe658KgscuWI', // run: firebase functions:config:set paypal.client_secret="yourPaypalClientSecret"
});

exports.generateSessionTokBox = functions.https.onRequest(
  (request, response) => {
    return opentok.createSession(
      { mediaMode: 'routed' },
      async (err, session) => {
        if (err) {
          response.end(err);
        }

        const token = await opentok.generateToken(session.sessionId);

        const result = {
          room_name: 'wakandha',
          session_id: session.sessionId,
          token,
        };

        response.send(result);
      },
    );
  },
);

exports.pay = functions.https.onRequest((req, res) => {
  const { price, offerID, uid, transactionType } = req.query;

  const payReq = JSON.stringify({
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: `${req.protocol}://${req.get(
        'host',
      )}/wakandha-c7cea/us-central1/process`,
      cancel_url: `${req.protocol}://${req.get(
        'host',
      )}/wakandha-c7cea/us-central1/cancel`,
    },
    transactions: [
      {
        amount: {
          total: price,
          currency: 'EUR',
        },
        description: offerID,
        custom: uid,
      },
    ],
  });

  paypal.payment.create(payReq, (error, payment) => {
    const links = {};
    if (error) {
      console.error(error);
      res.status('500').end();
    } else {
      payment.links.forEach((linkObj) => {
        links[linkObj.rel] = {
          href: linkObj.href,
          method: linkObj.method,
        };
      });
      if (Object.prototype.hasOwnProperty.call(links, 'approval_url')) {
        console.info(links.approval_url.href);
        res.redirect(302, links.approval_url.href);
      } else {
        console.error('no redirect URI present');
        res.status('500').end();
      }
    }
  });
});

exports.process = functions.https.onRequest(async (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = {
    payer_id: req.query.PayerID,
  };
  const r = await paypal.payment.execute(
    paymentId,
    payerId,
    (error, payment) => {
      if (error) {
        console.error(error);
        res.redirect('error');
      } else {
        if (payment.state === 'approved') {
          console.info('payment completed successfully');

          const { description } = payment.transactions[0];

          const paymentTimestamp = admin.firestore.FieldValue.serverTimestamp();

          if (description !== 'becomeSeller') {
            const ref = admin
              .firestore()
              .collection('products')
              .doc(description)
              .update({
                isOfferBought: true,
                paymentTimestamp,
              });
          }

          res.redirect('success');
        } else {
          console.warn('payment.state: not approved ?');
          // replace debug url
          res.redirect('error');
        }
      }
    },
  );
  console.info('promise: ', r);
});
