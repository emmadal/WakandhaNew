import { Platform, Dimensions, I18nManager } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const mainGold = '#DDB937';
const mainBlack = '#09090F';

const darkColorSet = {
  mainThemeBackgroundColor: mainBlack,
  mainThemeForegroundColor: mainGold,
  mainTextColor: mainGold,
  mainSubtextColor: '#fff',
  hairlineColor: '#e0e0e0',
  grey0: '#eaeaea',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  tint: '#3068CC',
  facebook: mainGold,
  grey: 'grey',
  whiteSmoke: '#1D1D27',
  headerTintColor: '#000000',
  bottomTintColor: 'grey',
  mainButtonColor: mainGold,
  subButtonColor: '#eaecf0',
  messageSender: '#C43379',
  timeColor: '#595959',
};

const colorSet = {
  light: darkColorSet,
  dark: darkColorSet,
  'no-preference': darkColorSet,
};

const navThemeConstants = {
  light: {
    backgroundColor: mainBlack,
    fontColor: mainGold,
    activeTintColor: mainGold,
    inactiveTintColor: '#ccc',
    hairlineColor: '#e0e0e0',
  },
  dark: {
    backgroundColor: mainBlack,
    fontColor: '#fff',
    activeTintColor: mainGold,
    inactiveTintColor: '#888',
    hairlineColor: '#222222',
  },
  main: mainGold,
  'no-preference': {
    backgroundColor: mainBlack,
    fontColor: '#000',
    activeTintColor: mainGold,
    inactiveTintColor: '#ccc',
    hairlineColor: '#e0e0e0',
  },
};

const imageSet = {
  chat: require('../assets/images/chat.png'),
  file: require('../assets/images/file.png'),
  like: require('../assets/images/like.png'),
  notification: require('../assets/images/notification.png'),
  photo: require('../assets/images/photo.png'),
  pin: require('../assets/images/pin.png'),
};

const iconSet = {
  appIcon: require('../assets/images/appIcon.png'),
  logo: require('../assets/images/app-logo.png'),
  userAvatar: require('./CoreAssets/default-avatar.jpg'),
  backArrow: require('./CoreAssets/arrow-back-icon.png'),
  menuHamburger: require('../assets/icons/menu-hamburger.png'),
  homeUnfilled: require('../assets/icons/home.png'),
  homefilled: require('../assets/icons/home.png'),
  search: require('../assets/icons/search.png'),
  magnifier: require('../assets/icons/magnifier.png'),
  commentUnfilled: require('../assets/icons/comment-unfilled.png'),
  commentFilled: require('../assets/icons/comment-unfilled.png'),
  friends: require('../assets/icons/friends.png'),
  profileUnfilled: require('../assets/icons/profile-unfilled.png'),
  profileFilled: require('../assets/icons/profile-filled.png'),
  camera: require('../assets/icons/camera.png'),
  cameraFilled: require('../assets/icons/camera-filled.png'),
  inscription: require('../assets/icons/inscription.png'),
  more: require('../assets/icons/more.png'),
  send: require('../assets/icons/send.png'),
  pinpoint: require('../assets/icons/pinpoint.png'),
  checked: require('../assets/icons/checked.png'),
  bell: require('../assets/icons/bell.png'),
  // blackPanther: require('../assets/icons/blackPanther.png'),
  surprised: require('../assets/icons/wow.png'),
  laugh: require('../assets/icons/crylaugh.png'),
  cry: require('../assets/icons/crying.png'),
  thumbsupUnfilled: require('../assets/icons/thumbsup-unfilled.png'),
  heartUnfilled: require('../assets/icons/heart-unfilled.png'),
  like: require('../assets/icons/wkdLike.png'),
  dislike: require('../assets/icons/wkd-dislike.png'),
  bored: require('../assets/icons/wkdThink.png'),
  love: require('../assets/icons/wkdLove.png'),
  angry: require('../assets/icons/wkdAngry.png'),
  cameraRotate: require('../assets/icons/camera-rotate.png'),
  videoCamera: require('../assets/icons/video-camera.png'),
  libraryLandscape: require('../assets/icons/library-landscape.png'),
  playButton: require('../assets/icons/play-button.png'),
  logout: require('../assets/icons/logout-drawer.png'),
  sound: require('../assets/icons/sound.png'),
  soundMute: require('../assets/icons/sound_mute.png'),
  microphone: require('../assets/icons/microphone.png'),
  share: require('../assets/icons/share.png'),
  plus: require('../assets/UI/plus.png'),
  video: require('../assets/icons/video.png'),
  marketplace: require('../assets/icons/marketplace.png'),
  playVideo: require('../assets/icons/playVideo.png'),
  post: require('../assets/icons/post.png'),
  promote: require('../assets/icons/promote.png'),
  view: require('../assets/icons/view.png'),
  verified: require('../assets/icons/verified.png'),
  blackPanther: require('../assets/icons/wkdBlackPanther.png'),
};

const fontFamily = {
  boldFont: '',
  semiBoldFont: '',
  regularFont: '',
  mediumFont: '',
  lightFont: '',
  extraLightFont: '',
};

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
};

const loadingModal = {
  color: mainGold,
  size: 20,
  overlayColor: 'rgba(0,0,0,0)',
  closeOnTouch: false,
  loadingType: 'Spinner', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
};

const sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 5,
};

const styleSet = {
  menuBtn: {
    container: {
      backgroundColor: colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: '#09090F',
      width: 15,
      height: 15,
    },
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: colorSet.inputBgColor,
      borderRadius: 10,
      color: '#09090F',
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
  textInputWidth: {
    main: '80%',
  },
  backArrowStyle: {
    resizeMode: 'contain',
    tintColor: mainGold,
    width: 25,
    height: 25,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
};

const StyleDict = {
  imageSet,
  iconSet,
  fontFamily,
  colorSet,
  navThemeConstants,
  fontSet,
  sizeSet,
  styleSet,
  loadingModal,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
};

export default StyleDict;
