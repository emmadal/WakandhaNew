import AppStyles from './AppStyles';
import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';
import { Platform } from 'react-native';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;

const SocialNetworkConfig = {
  isSMSAuthEnabled: true,
  adsConfig: null,
  // adsConfig: {
  //   facebookAdsPlacementID:
  //     Platform.OS === 'ios'
  //       ? '834318260403282_834914470343661'
  //       : '834318260403282_834390467062728',
  //   adSlotInjectionInterval: 10,
  // },
  appIdentifier: 'rn-social-network-android',
  onboardingConfig: {
    welcomeTitle: IMLocalized('Bienvenue sur Wakandha'),
    welcomeCaption: IMLocalized('Au cœur du Divertissement et du Business.'),
    walkthroughScreens: [
      {
        icon: require('../assets/images/file.png'),
        title: IMLocalized('Publications'),
        description: IMLocalized(
          'Partage des publications, des photos et des commentaires avec ton réseau',
        ),
      },
      {
        icon: require('../assets/images/photo.png'),
        title: IMLocalized("Wak'z"),
        description: IMLocalized("Partage des Wak'z pendant 24h à tes amis."),
      },
      {
        icon: require('../assets/images/like.png'),
        title: IMLocalized('Réactions'),
        description: IMLocalized(
          'Réagis à des publications grâce à nos émojis.',
        ),
      },
      {
        icon: require('../assets/images/chat.png'),
        title: IMLocalized('Chat'),
        description: IMLocalized('Discute avec tes amis par message privé.'),
      },
      {
        icon: require('../assets/icons/friends-unfilled.png'),
        title: IMLocalized('Chat de groupe'),
        description: IMLocalized(
          'Amuse toi avec ton groupe et les conversations à plusieurs.',
        ),
      },
      {
        icon: require('../assets/images/instagram.png'),
        title: IMLocalized('Envoi des photos et des vidéos'),
        description: IMLocalized(
          'Profite avec tes contacts en vous envoyant des photos et vidéos.',
        ),
      },
      {
        icon: require('../assets/images/pin.png'),
        title: IMLocalized('Localisation'),
        description: IMLocalized(
          'Partage ta localisation avec tes amis pour les tenirs informés.',
        ),
      },
      {
        icon: require('../assets/images/notification.png'),
        title: IMLocalized('Reste informé!'),
        description: IMLocalized(
          'Reçois des notifications à chaque nouveau match ou message.',
        ),
      },
    ],
  },
  tabIcons: {
    Feed: {
      focus: AppStyles.iconSet.homefilled,
      unFocus: AppStyles.iconSet.homeUnfilled,
    },
    Discover: {
      focus: AppStyles.iconSet.video,
      unFocus: AppStyles.iconSet.video,
    },
    Marketplace: {
      focus: AppStyles.iconSet.marketplace,
      unFocus: AppStyles.iconSet.marketplace,
    },
    Friends: {
      focus: AppStyles.iconSet.friends,
      unFocus: AppStyles.iconSet.friends,
    },
    Profile: {
      focus: AppStyles.iconSet.bell,
      unFocus: AppStyles.iconSet.bell,
    },
    Menu: {
      focus: AppStyles.iconSet.menuHamburger,
      unFocus: AppStyles.iconSet.menuHamburger,
    },
  },
  tosLink: 'https://www.instamobile.io/eula-instachatty/',
  editProfileFields: {
    sections: [
      {
        title: IMLocalized('Ton profil public'),
        fields: [
          {
            displayName: IMLocalized('Prénom'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Ton prénom',
          },
          {
            displayName: IMLocalized('Nom'),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Ton nom de famille',
          },
        ],
      },
      {
        title: IMLocalized('Détails privés'),
        fields: [
          {
            displayName: IMLocalized('Adresse mail'),
            type: 'text',
            editable: true,
            key: 'email',
            placeholder: 'Ton adresse mail',
          },
          {
            displayName: IMLocalized('Numéro de téléphone'),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Ton numéro de téléphone',
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized('Général'),
        fields: [
          {
            displayName: IMLocalized('Autoriser les notifications'),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: false,
          },
          {
            displayName: IMLocalized('Activer Face ID / Touch ID'),
            type: 'switch',
            editable: true,
            key: 'face_id_enabled',
            value: false,
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Sauvegarder'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized('Contact'),
        fields: [
          {
            displayName: IMLocalized('Adresse'),
            type: 'text',
            editable: false,
            key: 'push_notifications_enabled',
            value: 'Rond point de la Démocratie, 20244 Libreville',
          },
          {
            displayName: IMLocalized('Nous envoyer un mail'),
            value: 'wakandhaofficiel@gmail.com',
            type: 'text',
            editable: false,
            key: 'email',
            placeholder: 'Ton adresse mail',
          },
        ],
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized('Appelez-nous'),
            type: 'button',
            key: 'savebutton',
          },
        ],
      },
    ],
  },
  contactUsPhoneNumber: '+241 66030151',
};

export default SocialNetworkConfig;
