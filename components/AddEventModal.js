import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

export const AddEventModal = props => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="Title"
                        style={styles.input}
                        onChangeText={(text) => props.updateEventData('title', text)}
                        value={props.eventData.title}
                    />
                    <TextInput
                        placeholder="Event Link"
                        style={styles.input}
                        onChangeText={(text) => props.updateEventData('eventLink', text)}
                        value={props.eventData.eventLink}
                    />
                    <TextInput
                        placeholder="Tags"
                        style={styles.input}
                        onChangeText={(text) => props.updateEventData('tags', text.split(','))}
                        value={props.eventData.tags.join(', ')}
                    />
                    <View style={styles.imageUploader}>
                        <Text>Click to browse or drag and drop your files</Text>
                    </View>
                    <TextInput
                        placeholder="Description"
                        style={styles.input}
                        onChangeText={(text) => props.updateEventData('description', text)}
                        value={props.eventData.description}
                        multiline={true}
                    />
                    <View style={styles.mapPreview}>
                        <Text>Map preview will be here</Text>
                    </View>
                    <Button title="Add event" onPress={props.onPress} />
                    <Button title="Close" onPress={props.onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  imageUploader: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
  mapPreview: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    elevation: 2,
    borderRadius: 5,
  },
});
