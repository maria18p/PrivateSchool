import React from 'react';
import { Alert, Button, Text, View } from 'react-native';
import { removeRoom } from '../../../../api/Room_requests';
import Modal from 'react-native-modal';
import modalStyle from '../../../../styles/ModalStyles';

const DeleteModal = (props) => {
  const submit = async () => {
    const queryResult = await removeRoom(props.obj);
    Alert.alert(queryResult.message);
    props.closeModal();
  };

  return (
    <Modal isVisible={true} animationType='fade' backdropColor='#6969B3' backdropOpacity={0.35}>
      <View style={[modalStyle.modalContainer, { alignItems: 'center', flex: 0.3 }]}>
        <Text style={[modalStyle.txtModal, { marginTop: 20 }]}>Are you sure ?</Text>
        <View style={modalStyle.btnLayout}>
          <View style={{ marginTop: 15 }}>
            <Button title='Proceed' onPress={() => submit(props.obj)} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button title='Cancel' onPress={() => props.closeModal()} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
