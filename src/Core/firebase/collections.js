import { firebase } from './config';

const socialNetwork_posts = firebase
  .firestore()
  .collection('SocialNetwork_Posts');
const social_reactions = firebase
  .firestore()
  .collection('socialnetwork_reactions');
export { socialNetwork_posts, social_reactions };
