import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from 'react-native-button';

const UpdateModal = (props) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(props.initValue);
  }, [props.initValue]);
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
              <View style={{ width: '90%' }}>
                <TextInput
                  style={props.styles.InputContainer}
                  placeholderTextColor="#aaaaaa"
                  placeholder="Modifier Commentaire ..."
                  onChangeText={(text) => setValue(text)}
                  value={value}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  multiline={true}
                />

                <Button
                  containerStyle={props.styles.loginContainer}
                  style={props.styles.loginText}
                  onPress={() => props.update(value)}>
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

export default UpdateModal;
