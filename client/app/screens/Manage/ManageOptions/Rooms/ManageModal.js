import { Alert, Button, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { updateRoom } from '../../../../api/Room_requests';
import modalStyle from '../../../../styles/ModalStyles';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function ManageModal(props) {
  const [name, setName] = useState(props.obj.name);

  const submit = async () => {
    props.obj.name = name;
    const queryResult = await updateRoom(props.obj);
    Alert.alert(queryResult.message);
    props.closeModal();
  };

  const showObjData = () => {
    return (
      <View style={[modalStyle.modalContainer, { alignItems: 'center' }]}>
        <Text style={modalStyle.txtModal}>Enter new name room</Text>
        <MaterialCommunityIcons name='arrow-down' size={24} color='#000' />
        <TextInput
          value={name}
          placeholder='Enter new name room'
          onChangeText={(text) => setName(text)}
          style={[modalStyle.txtInputSubModal, { width: '88%', height: 45, marginTop: 10 }]}
        />
      </View>
    );
  };

  return (
    <View>
      <Modal isVisible={true} animationType='fade' backdropColor='#6969B3' backdropOpacity={0.35}>
        <View style={[modalStyle.modalContainer, { alignItems: 'center', flex: 0.5 }]}>
          <Text style={modalStyle.txtModal}>Room:</Text>
          {showObjData()}
          <View style={modalStyle.btnLayout}>
            <View style={{ marginTop: 50 }}>
              <Button title='Update' onPress={() => submit(props.obj)} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Button title='Cancel' onPress={() => props.closeModal()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
