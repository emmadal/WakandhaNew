import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect, ReactReduxContext } from 'react-redux';
import FastImage from 'react-native-fast-image';
import ActionSheet from 'react-native-actionsheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TNEmptyStateView } from '../../Core/truly-native';
import { firebase } from '../../Core/firebase/config';

import AppStyles from '../../AppStyles';
import styles from './styles';

class UserPages extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    return {
      headerTitle: '',
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: '#DDB937',
    };
  };

  constructor(props) {
    super(props);
    this.state = { userPages: [], selectedPageID: null };
  }

  componentDidMount() {
    const {
      user: { userID },
    } = this.props;

    this.unsubscribePages = firebase
      .firestore()
      .collection('users')
      .where('pageOwnerID', '==', userID)
      .onSnapshot((userPagesSnapshot) => {
        const userPages = [];

        userPagesSnapshot.forEach((pageSnapshot) => {
          userPages.push({ ...pageSnapshot.data() });
        });

        this.setState({ userPages });
      });
  }

  componentWillUnmount() {
    if (this.unsubscribePages) {
      this.unsubscribePages();
    }
  }

  async deletePage() {
    const { selectedPageID } = this.state;

    console.log(selectedPageID);

    try {
      const pagePublications = await firebase
        .firestore()
        .collection('SocialNetwork_Posts')
        .where('authorID', '==', selectedPageID)
        .get();

      pagePublications.forEach((pageSnapshot) => {
        pageSnapshot.ref.delete();
      });

      await firebase.firestore().doc(`users/${selectedPageID}`).delete();
    } catch (e) {
      console.log(e);
      Alert.alert('Il y a eu une erreur lors de la suppression de votre page.');
    }
  }

  render() {
    const { userPages } = this.state;

    console.log(userPages);

    const emptyStateConfig = {
      title: 'Pas encore de page',
      description:
        "Tu n'as pas encore créé de page, n'hésite pas à créer ta première page que tu pourras partager à la communauté Wakandha.",
      buttonName: 'Crée ta première page!',
      onPress: () =>
        this.props.navigation.navigate('NewPageCategory', {
          lastScreenTitle: 'UserPages',
        }),
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

        <View style={{ ...styles.pageTitleContainer, marginBottom: 0 }}>
          <Text style={styles.textPageTitle}>Mes pages</Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingTop: 30,
            paddingBottom: 150,
            paddingHorizontal: 10,
          }}>
          {userPages.length > 0 ? (
            userPages.map((pageData, index) => {
              const { pageCategory, pageName, profilePictureURL } = pageData;

              return (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('PageDetail', {
                        user: pageData,
                        stackKeyTitle: 'PageDetail',
                        lastScreenTitle: 'UserPages',
                      })
                    }
                    style={{
                      ...styles.containerSpaceBetween,
                      width: '100%',
                    }}>
                    <View style={styles.containerRowCenter}>
                      {profilePictureURL ? (
                        <FastImage
                          source={{ uri: profilePictureURL }}
                          style={{ ...styles.pictureAvatar, marginRight: 30 }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      ) : (
                        <View
                          style={{
                            ...styles.pictureAvatar,
                            backgroundColor: '#DDB937',
                            marginRight: 30,
                          }}
                        />
                      )}

                      <View>
                        <Text style={styles.textSubTitle}>{pageName}</Text>
                        <View style={styles.containerItemRound}>
                          <Text
                            numberOfLines={1}
                            style={{ ...styles.textParagraph, maxWidth: 180 }}>
                            {pageCategory}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ selectedPageID: pageData.id }, () =>
                          this.ActionSheetPageSettings.show(),
                        );
                      }}
                      style={{
                        ...styles.pictureAvatar,
                        backgroundColor: '#181825',
                        width: 40,
                        height: 40,
                      }}>
                      <Image
                        source={AppStyles.iconSet.more}
                        style={{
                          width: '50%',
                          height: '50%',
                          tintColor: '#DDB937',
                        }}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>

                  <View style={styles.verticalSeparator} />
                </>
              );
            })
          ) : (
            <TNEmptyStateView
              emptyStateConfig={emptyStateConfig}
              appStyles={AppStyles}
              style={{ marginTop: 20, marginBottom: 10 }}
            />
          )}
        </ScrollView>

        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('NewPageCategory', {
              lastScreenTitle: 'UserPages',
            })
          }
          style={styles.buttonNewPage}>
          <Image
            style={[styles.imageNewPage]}
            source={AppStyles.iconSet.plus}
          />
        </TouchableOpacity>

        <ActionSheet
          ref={(o) => (this.ActionSheetPageSettings = o)}
          title={'Options de la page'}
          options={['Supprimer la page', 'Annuler']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => {
            if (index === 0) {
              this.deletePage();
            }
          }}
        />
      </View>
    );
  }
}

const styless = StyleSheet.create({
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

export default connect(mapStateToProps, {})(UserPages);
