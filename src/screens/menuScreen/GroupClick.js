import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from 'react-native';

export default function GroupClick({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#cccccc"
        translucent={true}
      />

      <View style={styles.headerMain}>
        <View style={styles.headerleft}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={34} color="#DFBA35" />
          </TouchableWithoutFeedback>
          <Text style={styles.pages}>Groupes</Text>
        </View>
      </View>

      <ScrollView>
        <Text style={styles.pagesMain}>Groupes</Text>

        <View style={{ marginLeft: wp('3%') }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('NewGroupScreen')}>
            <View>
              <View style={styles.container2}>
                <FontAwesome5 name="flag" size={24} color="#DFBA35" />
                <Text style={styles.invitations}>Créer</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <View>
            <View style={styles.container2}>
              <FontAwesome5 name="user-plus" size={24} color="#DFBA35" />
              <Text style={styles.invitations}>Invitations à rejoindre</Text>
            </View>
          </View>

          <View>
            <View style={styles.container2}>
              <AntDesign name="find" size={26} color="#DFBA35" />
              <Text style={styles.invitations}>Découvrir</Text>
            </View>
          </View>

          <View>
            <View style={styles.container2}>
              <AntDesign name="like1" size={28} color="#DFBA35" />
              <Text style={styles.invitations}> Groupes adérés</Text>
            </View>
          </View>

          <TouchableWithoutFeedback>
            <View>
              <View style={styles.container2}>
                <AntDesign name="like1" size={28} color="#DFBA35" />
                <Text style={styles.invitations}> Vos groupes</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderBottomWidth: 0.25,
    borderBottomColor: 'white',
  },

  pages: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: wp('5%'),
    color: '#DFBA35',
  },

  pagesMain: {
    fontWeight: 'bold',
    fontSize: 35,
    marginVertical: hp('2%'),
    marginHorizontal: wp('5%'),
    color: '#DFBA35',
  },

  container2: {
    paddingLeft: wp('3%'),
    height: hp('11%'),
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#DFBA35',
    borderRadius: 12,
    elevation: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp('3%'),
    marginVertical: hp('0.7%'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },

  invitations: {
    fontSize: 22,
    paddingRight: wp('2%'),
    fontWeight: 'bold',
    marginLeft: wp('4%'),
    color: '#DFBA35',
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

{
  /* <View style={{flexDirection:'row',alignItems:'center',padding:wp('5%')}}>

<View style={styles.circle}>
  <Image style={{width:50,height:50}} source={require('./images/p3.png')}/>

</View>

<View style={{marginLeft:wp('5%')}}>
  <Text style={{fontSize:22,fontWeight:'bold'}}>DigiTech 241</Text>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    <View style={{width:10,height:10,borderRadius:5,backgroundColor:'blue'}}/>
    <Text style={{fontSize:18,marginLeft:wp('2%')}}>2 nouveaux</Text>
  </View>
</View>

</View> */
}

{
  /* <View>
<View style={styles.container2}>

    <AntDesign name="find" size={24} color="black"/>
   <Text style={styles.invitations}>Decoviir</Text>

</View>

</View> */
}

{
  /* <View>
<View style={styles.container2}>
<View style={{width:12,height:12,borderRadius:6,backgroundColor:'blue',position:'absolute',right:10,top:1}}/>
    <FontAwesome5 name="user-plus" size={24} color="black"/>
   <Text style={styles.invitations}>Invitations</Text>


</View>

</View>


<View style={{marginRight:wp('100%')}}>
<View style={styles.container2}>

    <AntDesign name="like1" size={28} color="black"/>
   <Text style={styles.invitations}>Pages</Text>

</View>

</View> */
}
