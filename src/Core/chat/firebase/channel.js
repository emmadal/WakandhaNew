import uuidv4 from 'uuidv4';
import { firebase } from '../../firebase/config';

const channelsRef = firebase.firestore().collection('channels');
const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg';
const channelPaticipationRef = firebase
  .firestore()
  .collection('channel_participation');

const onCollectionUpdate = (querySnapshot, userId, callback) => {
  const data = [];
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    user.id = doc.id;

    if (user.id !== userId) {
      data.push(user);
    }
  });
  return callback(data, channelsRef);
};

export const subscribeChannelParticipation = (userId, callback) => {
  return channelPaticipationRef
    .where('user', '==', userId)
    .onSnapshot((querySnapshot) =>
      onCollectionUpdate(querySnapshot, userId, callback),
    );
};

export const subscribeChannels = (callback) => {
  return channelsRef.onSnapshot((snapshot) =>
    callback(snapshot.docs.map((doc) => doc.data())),
  );
};

export const fetchChannelParticipantIDs = async (channel, callback) => {
  channelPaticipationRef
    .where('channel', '==', channel.id)
    .get()
    .then((snapshot) => {
      callback(snapshot.docs.map((doc) => doc.data().user));
    })
    .catch((error) => {
      console.log(error);
      callback([]);
    });
};

export const subscribeThreadSnapshot = (channel, callback) => {
  return channelsRef
    .doc(channel.id)
    .collection('thread')
    .orderBy('created', 'desc')
    .onSnapshot(callback);
};

export const sendMessage = (
  sender,
  channel,
  message,
  downloadURL,
  inReplyToItem,
) => {
  return new Promise((resolve) => {
    const { userID, profilePictureURL } = sender;
    const timestamp = currentTimestamp();

    const data = {
      content: message,
      created: timestamp,
      recipientFirstName: '',
      recipientID: '',
      recipientLastName: '',
      recipientProfilePictureURL: '',
      senderFirstName: sender.firstName || sender.fullname,
      senderID: userID,
      senderLastName: '',
      senderProfilePictureURL: profilePictureURL
        ? profilePictureURL
        : defaultAvatar,
      url: downloadURL,
      inReplyToItem,
    };
    const channelID = channel.id;
    channelsRef
      .doc(channelID)
      .collection('thread')
      .add({ ...data })
      .then(() => {
        console.log('hello world');
        channelsRef
          .doc(channelID)
          .update({
            lastMessage: message && message.length > 0 ? message : downloadURL,
            lastMessageDate: timestamp,
          })
          .then((response) => {
            resolve({ success: true });
          })
          .catch((error) => {
            resolve({ success: false, error: error });
          });
      })
      .catch((error) => {
        resolve({ success: false, error: error });
      });
  });
};

export const createChannel = (creator, otherParticipants, name) => {
  return new Promise((resolve) => {
    let channelID = uuidv4();
    const id1 = creator.id || creator.userID;

    console.log(otherParticipants);

    if (otherParticipants.length === 1) {
      const id2 = otherParticipants[0].id || otherParticipants[0].userID;
      if (id1 === id2) {
        // We should never create a self chat
        resolve({ success: false });
        return;
      }
      channelID = id1 < id2 ? id1 + id2 : id2 + id1;
    }

    const channelData = {
      creator_id: id1,
      creatorID: id1,
      id: channelID,
      channelID,
      name: name || '',
      lastMessageDate: currentTimestamp(),
    };

    channelsRef
      .doc(channelID)
      .set({
        ...channelData,
      })
      .then((channelRef) => {
        persistChannelParticipations(
          [...otherParticipants, creator],
          channelID,
        ).then((response) => {
          resolve({ success: response.success, channel: channelData });
        });
      })
      .catch(() => {
        resolve({ success: false });
      });
  });
};

export const persistChannelParticipations = (users, channelID) => {
  return new Promise((resolve) => {
    const db = firebase.firestore();
    let batch = db.batch();
    users.forEach((user) => {
      let ref = channelPaticipationRef.doc();
      batch.set(ref, {
        channel: channelID,
        user: user.id,
      });
    });
    // Commit the batch
    batch.commit().then(function () {
      resolve({ success: true });
    });
  });
};

export const onLeaveGroup = (channelId, userId, callback) => {
  channelPaticipationRef
    .where('channel', '==', channelId)
    .where('user', '==', userId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
        callback({ success: true });
      });
    })
    .catch((error) => {
      console.log(error);
      callback({ success: false, error: 'An error occured, please try gain.' });
    });
};

export const onRenameGroup = (text, channel, callback) => {
  channelsRef
    .doc(channel.id)
    .set(channel)
    .then(() => {
      const newChannel = channel;
      newChannel.name = text;
      callback({ success: true, newChannel });
    })
    .catch((error) => {
      console.log(error);
      callback({ success: false, error: 'An error occured, please try gain.' });
    });
};

export const currentTimestamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};
