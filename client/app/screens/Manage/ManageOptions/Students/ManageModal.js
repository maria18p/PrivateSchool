import { Button, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';

export default function ManageModal(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLaseName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setFirstName(props.obj.firstName);
    setLaseName(props.obj.lastName);
    setEmail(props.obj.email);
  }, []);

  const showObjData = () => {
    return (
      <View>
        <Text>Email:</Text>
        <TextInput value={email} />
        <Text>First Name:</Text>
        <TextInput value={firstName} />
        <Text>Last Name:</Text>
        <TextInput value={lastName} />
      </View>
    );
  };

  return (
    <View>
      <Modal
        isVisible={true}
        animationIn='slideInUp'
        backdropColor='#6969B3'
        backdropOpacity={0.35}>
        <View
          style={{
            flex: 1,
            width: '95%',
            backgroundColor: '#ffffff',
            alignSelf: 'center',
          }}>
          <Text>Student:</Text>
          {showObjData()}
          <Button
            title='Update'
            // onPress={() => props.setModalShown(false)}
          />
          <Button title='Cancel' onPress={() => props.closeModal()} />
        </View>
      </Modal>
    </View>
  );
}
