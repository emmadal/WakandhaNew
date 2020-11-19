import { getUserData } from './user';
import { social_reactions } from './collections';

/**
 * return users reactions ( comments || posts )
 * @param getUser
 * @param type_id ( enum [ postID , commentID ] )
 * @returns {function(*=): Promise<[]|{error: *}|undefined>}
 * @returns : Promise => [ user , reaction ]
 */
const getByReactionAction = (getUser, type_id) => async (id) => {
  try {
    let users = [];
    let reactionsData = [];
    const reactions = await social_reactions.where(type_id, '==', id).get();
    reactions.forEach((e) => {
      reactionsData.push(e.data());
    });
    for (const doc of reactionsData) {
      const user = await getUser(doc.reactionAuthorID);
      users.push({
        user: { ...user.data },
        reaction: doc.reaction,
      });
    }
    return users;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getUsersReactionsComments = getByReactionAction(
  getUserData,
  'postID',
);
export const getUsersReactionsPosts = getByReactionAction(
  getUserData,
  'postID',
);
