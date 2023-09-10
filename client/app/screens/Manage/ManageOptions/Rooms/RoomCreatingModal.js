import { Button, Text, TextInput, View, Alert } from 'react-native';
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { addRoom, getAllRooms } from '../../../../api/Room_requests';
import { useDispatch, useSelector } from 'react-redux';
import modalStyle from '../../../../styles/ModalStyles';

export default function RoomCreationModal(props) {
   const [roomName, setRoomName] = useState('');
   // const [existingRoomNames, setExistingRoomNames] = useState([]);

   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();

   // const fetchExistingRoomNames = async () => {
   //    const existingNames = await getAllRooms();
   //    setExistingRoomNames(existingNames);
   // };

   // const submit = async () => {
   //    try {
   //       await fetchExistingRoomNames();
   //       const isRoomExists = existingRoomNames.includes(roomName);

   //       if (isRoomExists) {
   //          console.log('--------');
   //          Alert.alert('Room with the same name already exists.');
   //          return;
   //       }

   //       const resCreate = await addRoom({
   //          user: userData,
   //          name: roomName,
   //       });

   //       if (resCreate && resCreate.message === 'Room created successfully') {
   //          setExistingRoomNames([...existingRoomNames, roomName]);
   //       }

   //       Alert.alert(resCreate.message);
   //       console.log('=========');
   //       props.closeModal();
   //    } catch (error) {
   //       console.error('Error:', error);
   //       Alert.alert('Failed to create room.');
   //    }
   // };

   const submit = async () => {
      const resCreate = await addRoom({
         user: userData,
         name: roomName,
      });
      Alert.alert(resCreate.data.message);
      props.closeModal();
      // if (existingRoomNames.includes(roomName)) {
      //    console.log('--------');
      //    Alert.alert('Room with the same name already exists.');
      //    return;
      // } else {
      //    try {
      //       const resCreate = await addRoom({
      //          user: userData,
      //          name: roomName,
      //       });
      //       if (resCreate && resCreate.message === 'Room created successfully') {
      //          setExistingRoomNames([...existingRoomNames, roomName]);
      //       }
      //       Alert.alert(resCreate.message);
      //       console.log('=========');
      //       props.closeModal();
      //    } catch (error) {
      //       console.error('Error:', error);
      //       Alert.alert('Failed to create room.');
      //    }
      // }
   };

   return (
      <View>
         <Modal
            isVisible={true}
            animationIn='slideInUp'
            backdropColor='#6969B3'
            backdropOpacity={0.35}>
            <View style={[modalStyle.modalContainer, { alignItems: 'center', flex: 0.6 }]}>
               <Text style={[modalStyle.txtModal, { marginTop: 20 }]}>Name:</Text>
               <TextInput
                  style={[modalStyle.txtInputSubModal, { width: '88%', height: 45 }]}
                  placeholder='new Name'
                  onChangeText={(text) => setRoomName(text)}
                  value={roomName}
               />
               <View style={modalStyle.btnLayout}>
                  <View style={{ marginTop: 50 }}>
                     <Button title='Submit' onPress={() => submit()} />
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
