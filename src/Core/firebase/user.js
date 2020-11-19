import { firebase } from './config';
import { socialNetwork_posts } from './collections';

export const usersRef = firebase.firestore().collection('users');

export const getUserData = async (userId) => {
  try {
    const user = await usersRef.doc(userId).get();

    return { data: { ...user.data(), id: user.id }, success: true };
  } catch (error) {
    console.log(error);
    return {
      error: 'Oops! an error occured. Please try again',
      success: false,
    };
  }
};
/**
 * update post author
 * @param post
 * @param authorData
 * @returns {Promise<*>}
 */
export const updateAuthorPost = async (post, authorData) => {
  const post_u = await socialNetwork_posts.doc(post.id);
  return post_u.update({
    author: { ...post.author, ...authorData },
  });
};

/**
 * update post firstName lastName , (author)
 * into socialNetwork_posts
 */
export const updateAllPostAuthorByUserId = async (userId, authorData) => {
  try {
    const posts = await socialNetwork_posts
      .where('authorID', '==', userId)
      .get();

    posts.forEach((post) => {
      updateAuthorPost(post.data(), authorData)
        .then((e) => console.log('updated'))
        .catch((error) => console.log(error));
    });
  } catch (error) {
    return { error };
  }
};

/**
 * update User Data
 * @param userId
 * @param userData
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
export const updateUserData = async (userId, userData) => {
  try {
    const userRef = usersRef.doc(userId);

    await userRef.update({
      ...userData,
    });

    return { success: true };
  } catch (error) {
    return { error, success: false };
  }
};

export const subscribeUsers = (userId, callback) => {
  return usersRef.onSnapshot((querySnapshot) => {
    const data = [];
    const completeData = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      data.push({ ...user, id: doc.id });
      completeData.push({ ...user, id: doc.id });
    });
    return callback(data, completeData);
  });
};

export const subscribeCurrentUser = (userId, callback) => {
  const ref = usersRef
    .where('id', '==', userId)
    .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
      const docs = querySnapshot.docs;
      if (docs.length > 0) {
        callback(docs[0].data());
      }
    });
  return ref;
};
