import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from 'react-native-button';

const BaseModal = (props) => {
  const [firstName, setFirstName] = useState(props.data.firstName);
  const [lastName, setLastName] = useState(props.data.lastName);
  const handleEdit = (firstName, lastName) => {
    props.handleEdit(firstName, lastName);
  };
  return (
    <View>
      <Modal
        animationType={'fade'}
        visible={props.visible}
        onRequestClose={props.dismiss}
        transparent={true}>
        <View style={styles.topContainer}>
          <TouchableWithoutFeedback onPress={props.dismiss}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.container}>
              <View style={{ width: '80%' }}>
                <TextInput
                  style={props.styles.InputContainer}
                  placeholderTextColor="#aaaaaa"
                  placeholder="Prénom ..."
                  onChangeText={(text) => setFirstName(text)}
                  value={firstName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <TextInput
                  style={props.styles.InputContainer}
                  placeholderTextColor="#aaaaaa"
                  placeholder="Nom ..."
                  onChangeText={(text) => setLastName(text)}
                  value={lastName}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                />
                <Button
                  containerStyle={props.styles.loginContainer}
                  style={props.styles.loginText}
                  onPress={() => handleEdit(firstName, lastName)}>
                  modifier
                </Button>
              </View>
            </View>
            <TouchableOpacity style={styles.close} onPress={props.dismiss}>
              <Icon name="close" color="#fff" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContent: {
    width: '90%',
    backgroundColor: '#343434',
    borderRadius: 20,
    padding: 20,
    height: 250,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  close: { position: 'absolute', top: 5, right: 15 },
});

export default BaseModal;
