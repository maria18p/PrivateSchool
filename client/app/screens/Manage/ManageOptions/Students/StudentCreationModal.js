import { Button, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function StudentCreationModal(props) {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newPassword, setNewPassword] = useState(userData.password);

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
          <Text>Email:</Text>
          <TextInput
            style={{}}
            placeholder='enter new Email'
            keyboardType='email-address'
            textContentType='emailAddress'
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
          />
          <Text>Password:</Text>
          <TextInput
            style={{}}
            placeholder='Password'
            secureTextEntry={true}
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            autoCorrect={false}
          />
          <Button
            title='Submit'
            // onPress={() => props.setModalShown(false)}
          />
          <Button title='Cancel' onPress={() => props.closeModal()} />
        </View>
      </Modal>
    </View>
  );
}
