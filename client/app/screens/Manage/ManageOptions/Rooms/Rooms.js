import { Text, TouchableOpacity, View, TouchableHighlight, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ManageModal from './ManageModal';
import RoomCreationModal from './RoomCreatingModal';
import { getAllRooms } from '../../../../api/Room_requests';
import ManageStyles from '../../../../styles/ManageOptionStyles';
import DeleteModal from './DeleteModal';
import { DataTable } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Rooms(props) {
   const touchableHighlightProps = {
      activeOpacity: 0.8,
      underlayColor: '#DD2D4A',
      onHideUnderlay: () => setIsPress(false),
      onShowUnderlay: () => setIsPress(true),
   };

   const [isPress, setIsPress] = useState(false);
   const [creationModalShown, setCreationModalShown] = useState(false);
   const [data, setData] = useState([]);
   const [sortAscending, setSortAscending] = useState(true);
   const [roomToDelete, setRoomToDelete] = useState(null);
   const [roomToUpdate, setRoomToUpdate] = useState(null);

   useEffect(() => {
      updateData();
   }, []);

   const updateData = async () => {
      let fetched = [];
      if (props.title === 'Rooms') {
         fetched = await getAllRooms({});
         setData(fetched.data);
      }
   };

   const showManageModal = () => {
      if (!roomToUpdate) return <></>;
      if (props.title === 'Rooms')
         return (
            <ManageModal type={props.title} obj={roomToUpdate} closeModal={() => closeModal()} />
         );
   };

   const closeModal = () => {
      if (roomToUpdate) setRoomToUpdate(null);
      if (roomToDelete) setRoomToDelete(null);
      if (creationModalShown) setCreationModalShown(false);
      updateData();
   };

   const closeCreationModal = async () => {
      setCreationModalShown(false);
      await updateData();
   };

   const showCreationModal = () => {
      if (!creationModalShown) return <></>;
      if (props.title === 'Rooms') return <RoomCreationModal closeModal={() => closeModal()} />;
   };

   const showDeleteModal = () => {
      if (!roomToDelete) return <></>;
      if (props.title === 'Rooms')
         return (
            <DeleteModal type={props.title} obj={roomToDelete} closeModal={() => closeModal()} />
         );
   };

   const sortRoomsAlphabetically = () => {
      const sortedData = [...data].sort((room1, room2) => {
         if (sortAscending) {
            return room1.name.localeCompare(room2.name);
         } else {
            return room2.name.localeCompare(room1.name);
         }
      });
      setData(sortedData);
      setSortAscending(!sortAscending);
   };

   const getSortIcon = () => (
      <View
         style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#4062BB',
            borderWidth: 1,
            borderRadius: 7,
         }}>
         {sortAscending ? (
            <MaterialIcons name='sort-by-alpha' size={25} color='#4062BB' />
         ) : (
            <MaterialIcons name='sort-by-alpha' size={25} color='#4062BB' />
         )}
      </View>
   );

   const getAllObjects = () => {
      return (
         <DataTable style={{ marginTop: 12 }}>
            <DataTable.Header style={{ backgroundColor: '#0ABED6' }}>
               <DataTable.Title textStyle={ManageStyles.tableTxtTitleStyle}>room</DataTable.Title>
               <DataTable.Title onPress={sortRoomsAlphabetically}>{getSortIcon()}</DataTable.Title>
               <DataTable.Title textStyle={[ManageStyles.tableTxtTitleStyle, { marginLeft: 0 }]}>
                  Edit
               </DataTable.Title>
               <DataTable.Title numeric textStyle={ManageStyles.tableTxtTitleStyle}>
                  Delete
               </DataTable.Title>
            </DataTable.Header>
            <LinearGradient
               colors={['#C4F1BE', '#525B76', '#E7ECEF']}
               start={{ x: 2, y: 1 }}
               end={{ x: 0, y: 0 }}>
               {data.map((room, index) => {
                  return (
                     <DataTable.Row key={index} style={{ borderBottomColor: '#201E50' }}>
                        <DataTable.Cell
                           textStyle={[ManageStyles.tableTxtTitleStyle, ManageStyles.roomName]}>
                           {room.name}
                        </DataTable.Cell>

                        <DataTable.Cell numeric style={ManageStyles.editCell}>
                           <TouchableOpacity onPress={() => setRoomToUpdate(room)}>
                              <Icon name='edit' type='ionicons' color='#FCEADE' size={26} />
                           </TouchableOpacity>
                        </DataTable.Cell>

                        <DataTable.Cell numeric style={{ marginRight: 10 }}>
                           <TouchableOpacity onPress={() => setRoomToDelete(room)}>
                              <Icon name='delete' type='ionicons' color='#EB8F1E' size={26} />
                           </TouchableOpacity>
                        </DataTable.Cell>
                     </DataTable.Row>
                  );
               })}
            </LinearGradient>
         </DataTable>
      );
   };

   return (
      <>
         {showCreationModal()}
         {showManageModal()}
         {showDeleteModal()}
         <View style={ManageStyles.headBtnLayout}>
            <TouchableHighlight
               onPress={() => props.back()}
               {...touchableHighlightProps}
               style={[ManageStyles.btnStyle, { backgroundColor: '#009FFD' }]}>
               <Text style={ManageStyles.txtBtn}>back</Text>
            </TouchableHighlight>

            <TouchableHighlight
               style={ManageStyles.btnStyle}
               {...touchableHighlightProps}
               onPress={() => setCreationModalShown(true)}>
               <Text style={ManageStyles.txtBtn}>add new</Text>
            </TouchableHighlight>
         </View>
         <ScrollView style={{ height: '85%' }}>
            <View style={ManageStyles.tableLayout}>{getAllObjects()}</View>
         </ScrollView>
      </>
   );
}
