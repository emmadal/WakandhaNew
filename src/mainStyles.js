import { StyleSheet } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const mainGold = '#DDB937';
const lightGrey = '#e0e4e7';

const containerRowCenter = {
  flexDirection: 'row',
  alignItems: 'center',
};

const styles = new StyleSheet.create({
  // Container

  containerRowCenter,

  containerSpaceBetween: {
    ...containerRowCenter,
    width: '100%',
    justifyContent: 'space-between',
  },

  containerItem: {
    ...containerRowCenter,
    backgroundColor: '#1D1D27',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
  },

  containerItemRound: {
    height: 35,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
    borderColor: mainGold,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerDashed: {
    height: responsiveHeight(15),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: mainGold,
    justifyContent: 'center',
    marginBottom: 15,
  },

  pageContainer: {
    flex: 1,
    backgroundColor: '#09090F',
    paddingTop: 15,
  },
  pageTitleContainer: {
    borderBottomColor: '#343434',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 30,
  },
  textPageTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: mainGold,
    paddingHorizontal: 10,
  },

  // Buttons and UI
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    left: 10,
    backgroundColor: mainGold,
    borderRadius: 5,
    paddingVertical: 15,
    alignSelf: 'center',
  },

  disabledButtonContainer: {
    backgroundColor: lightGrey,
    opacity: 0.5,
  },

  checkbox: {
    height: 20,
    width: 20,
    marginRight: 15,
    borderRadius: 50,
    borderColor: mainGold,
    borderWidth: 1,
  },

  verticalSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 30,
  },

  // Text
  textTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: mainGold,
    marginBottom: 10,
  },
  textSubTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: mainGold,
    marginBottom: 10,
  },
  textParagraph: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 25,
    color: mainGold,
  },
  textButton: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  disabledButton: {
    color: 'white',
  },

  // Image
  pictureAvatar: {
    width: 80,
    height: 80,
    borderRadius: 150,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
