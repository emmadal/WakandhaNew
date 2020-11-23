import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { connect, ReactReduxContext } from 'react-redux';
import { TextField } from 'react-native-material-textfield';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AppStyles from '../../AppStyles';

import { firebase } from '../../Core/firebase/config';

import styles from './styles';

class NewPageName extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: 'Nouvelle page',
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: '#DDB937',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      pageName: '',
    };
  }

  async createNewPage() {
    const {
      user: { userID },
    } = this.props;
    const pageCategory = this.props.navigation.getParam('pageCategory');
    const { pageName } = this.state;

    try {
      this.setState({ isLoading: true });

      if (pageName.trim().length < 4) {
        throw new Error('Le nom de la page doit avoir plus de 4 caractères.');
      }

      const docRef = await firebase
        .firestore()
        .collection('users')
        .add({ pageCategory, pageName, pageOwnerID: userID });

      firebase
        .firestore()
        .collection('users')
        .doc(docRef.id)
        .update({ userID: docRef.id, id: docRef.id });
    } catch (e) {
      Alert.alert('Il y a eu une erreur à la création de votre page.');
    } finally {
      this.setState({ isLoading: false });

      this.props.navigation.reset({
        key: null,
        index: 0,
        actions: [this.props.navigation.navigate({ routeName: 'UserPages' })],
      });
    }
  }

  render() {
    const { pageName, isLoading } = this.state;

    const mainYellowColor = '#DDB937';

    const textInputProps = {
      autoFocus: true,
      placeholderTextColor: mainYellowColor,
      fontSize: 15,
      labelTextStyle: { fontSize: 15 },
      textColor: mainYellowColor,
      baseColor: mainYellowColor,
      maxLength: 50,
    };

    return (
      <View style={styles.pageContainer}>
        <View style={styless.headerMain}>
          <View style={styless.headerleft}>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back-sharp" size={34} color="#DFBA35" />
            </TouchableWithoutFeedback>
            <Text style={styless.pagess}>Pages</Text>
          </View>
        </View>

        <View style={[styles.pageTitleContainer, { marginBottom: 0 }]}>
          <Text style={styles.textPageTitle}>Nom</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={[styles.textParagraph, { marginBottom: 30 }]}>
            Saisissez le nom désiré pour la page, celui-ci sera visible à tout
            les utilisateurs.
          </Text>

          <TextField
            {...textInputProps}
            value={pageName}
            onChangeText={(text) => this.setState({ pageName: text })}
            label="Nom de la page"
          />
        </View>

        {pageName.length > 4 && !isLoading && (
          <TouchableOpacity
            onPress={() => this.createNewPage()}
            style={styles.buttonContainer}>
            <Text style={styles.textButton}>Créer ma page</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#000000',
  },

  headerleft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },

  pages: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: wp('5%'),
    color: '#DFBA35',
  },
});

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(NewPageName);
