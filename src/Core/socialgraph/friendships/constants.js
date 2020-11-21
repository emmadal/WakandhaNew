import { IMLocalized } from '../../localization/IMLocalization';

const FriendshipType = {
  none: 'none',
  inbound: 'inbound',
  outbound: 'outbound',
  reciprocal: 'reciprocal',
};

const localizedActionTitle = (friendshipType) => {
  switch (friendshipType) {
    case FriendshipType.none:
      return IMLocalized('Ajouter');
    case FriendshipType.inbound:
      return IMLocalized('Accepter');
    case FriendshipType.outbound:
      return IMLocalized('Annuler');
    case FriendshipType.reciprocal:
      return IMLocalized('Supprimer');
  }
  return null;
};

const localizedFollowActionTitle = (friendshipType) => {
  switch (friendshipType) {
    case FriendshipType.none:
      return IMLocalized('Suivre');
    case FriendshipType.inbound:
      return IMLocalized('Suivre en retour');
    case FriendshipType.outbound:
      return IMLocalized('Unfollow');
    case FriendshipType.reciprocal:
      return IMLocalized('Unfollow');
  }
  return null;
};

export const FriendshipConstants = {
  localizedActionTitle,
  localizedFollowActionTitle,
  FriendshipType,
};
