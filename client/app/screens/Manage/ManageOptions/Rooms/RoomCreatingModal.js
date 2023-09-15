import { Button, Text, TextInput, View, Alert } from 'react-native';
import Modal from 'react-native-modal';
import React, { useState, useEffect } from 'react';
import { addRoom, getAllRooms } from '../../../../api/Room_requests';
import { useDispatch, useSelector } from 'react-redux';
import modalStyle from '../../../../styles/ModalStyles';

export default function RoomCreationModal(props) {
   const [roomName, setRoomName] = useState('');
   const [existingRoomData, setExistingRoomData] = useState([]);

   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const fetchExistingRoomNames = async () => {
      try {
         const existingNames = await getAllRooms();
         const roomDataArray = existingNames.data || [];
         for (const key in roomDataArray) {
            const room = roomDataArray[key];
            existingRoomData.push(room);
         }
         setExistingRoomData(existingRoomData);
         const roomExists = existingRoomData.some(
            (room) => room.name.toLowerCase() === roomName.toLowerCase(),
         );
         console.log('roomExists - ', roomExists);
         console.log('>>>>>>>>>>>>>');

         if (roomExists) {
            Alert.alert('Room with the same name already exists.');
         } else {
            // Add the room only if it doesn't exist
            const resCreate = await addRoom({
               user: userData,
               name: roomName,
            });
            Alert.alert(resCreate.data.message);
            // Update existingRoomData with the newly added room
            setExistingRoomData([...existingRoomData, { name: roomName }]);
         }
         props.closeModal();
      } catch (error) {
         console.error('Error:', error);
      }
   };

   const submit = async () => {
      try {
         await fetchExistingRoomNames();
      } catch (error) {
         console.error('Error:', error);
      }
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
