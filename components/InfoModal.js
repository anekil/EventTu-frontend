import * as React from "react";
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PrimaryButton } from "./Button";

export const InfoPopup = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        <View style={styles.iconContainer}>
          <Icon name="times-circle" size={60} color="red" />
        </View>
        <Text style={styles.text}>{props.info}</Text>
        <PrimaryButton title="Close" onPress={props.onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
