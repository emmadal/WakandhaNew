import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect, ReactReduxContext } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppStyles from '../../AppStyles';

import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native';

class NewPageCategory extends Component {
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
      pageCategory: null,
    };
  }

  render() {
    const { pageCategory } = this.state;

    const categoriesList = [
      'Personnalité publique',
      'Personnalité politique',
      'Artiste',
      'Comédien',
      'Humoriste',
      'Créateur de contenu',
      'Photographe / Vidéaste',
      'Cinéma',
      'Entreprise',
      'Communauté',
      'Communauté religieuse',
      'Groupe de musique',
      'Association',
      'Organisation gouvernementale',
      'ONG',
      'École pré-primaire',
      'École primaire',
      'Collège',
      'Lycée',
      'Université',
      'Encore supérieur',
      'Coaching',
      'Club Sportif',
      'Infopreneur',
      'Web entrepreneur',
      'Administration privé',
      'Administration publique',
      'Banque',
      'Finances',
      'Cabinet',
      'Micro-finance',
      'Télécommunication',
      'Médias',
      'Chroniqueur',
    ];

    return (
      <View style={styles.pageContainer}>
        <View style={styless.headerMain}>
          <View style={styless.headerleft}>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back-sharp" size={34} color="#DFBA35" />
            </TouchableWithoutFeedback>
            <Text style={styless.pages}> Nouvelle Page</Text>
          </View>
        </View>

        <View style={[styles.pageTitleContainer, { top: hp('1%') }]}>
          <Text style={styles.textPageTitle}>Catégorie</Text>
        </View>

        <ScrollView
          style={{ padding: 10 }}
          contentContainerStyle={{ paddingBottom: 150 }}>
          <Text style={[styles.textParagraph, { marginBottom: 30 }]}>
            Sélectionnez la catégorie qui correspond le plus à la page que vous
            souhaitez créer.
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {categoriesList.map((category, index) => (
              <TouchableOpacity
                onPress={() => this.setState({ pageCategory: category })}
                style={[
                  styles.containerItemRound,
                  pageCategory === category && {
                    backgroundColor: '#DDB937',
                  },
                ]}>
                <Text
                  style={[
                    styles.textParagraph,
                    pageCategory === category && { color: 'black' },
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {pageCategory && (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('NewPageName', {
                lastScreenTitle: 'NewPageCategory',
                pageCategory,
              })
            }
            style={styles.buttonContainer}>
            <Text style={styles.textButton}>Suivant</Text>
          </TouchableOpacity>
        )}
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
    marginHorizontal: wp('18%'),
    color: '#DFBA35',
  },
});

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {})(NewPageCategory);
