import * as React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

export const InfoPopup = ({ isVisible, onClose }) => {
    return (
      <Modal isVisible={isVisible}>
        <View>
          <Text>Authentication Failed</Text>
          <Text>Please check your credentials and try again.</Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
