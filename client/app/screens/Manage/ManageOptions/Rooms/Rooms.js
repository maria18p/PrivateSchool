import { Text, TouchableOpacity, View, TouchableHighlight, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ManageModal from './ManageModal';
import RoomCreationModal from './RoomCreatingModal';
import { getAllRooms } from '../../../../api/Room_requests';
import ManageStyles from '../../../../styles/ManageOptionStyles';
import DeleteModal from './DeleteModal';
import { DataTable } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function Rooms(props) {
  const touchableHighlightProps = {
    activeOpacity: 0.8,
    underlayColor: '#FF331F',
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
  };
  const [isPress, setIsPress] = useState(false);
  const [creationModalShown, setCreationModalShown] = useState(false);
  const [data, setData] = useState([]);

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

  const getAllObjects = () => {
    return (
      <DataTable>
        <DataTable.Header style={{ backgroundColor: '#76E5FC' }}>
          <DataTable.Title textStyle={ManageStyles.tableTxtTitleStyle}>room</DataTable.Title>
          <DataTable.Title numeric textStyle={ManageStyles.tableTxtTitleStyle}>
            action 1
          </DataTable.Title>
          <DataTable.Title numeric textStyle={ManageStyles.tableTxtTitleStyle}>
            action 2
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
                  textStyle={[
                    ManageStyles.tableTxtTitleStyle,
                    { color: '#16425B', textShadowColor: '#81C3D7' },
                  ]}>
                  {room.name}
                </DataTable.Cell>

                <DataTable.Cell numeric>
                  <TouchableOpacity
                    onPress={() => setRoomToUpdate(room)}
                    style={ManageStyles.btnContainer}>
                    <Text style={{ color: '#000' }}>Update</Text>
                  </TouchableOpacity>
                </DataTable.Cell>

                <DataTable.Cell numeric>
                  <TouchableOpacity
                    onPress={() => setRoomToDelete(room)}
                    style={[ManageStyles.btnContainer, { backgroundColor: '#9C3848' }]}>
                    <Text style={{ color: '#fff' }}>Delete</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </LinearGradient>
      </DataTable>
    );
  };

  const showManageModal = () => {
    if (!roomToUpdate) return <></>;
    if (props.title === 'Rooms')
      return <ManageModal type={props.title} obj={roomToUpdate} closeModal={() => closeModal()} />;
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
      return <DeleteModal type={props.title} obj={roomToDelete} closeModal={() => closeModal()} />;
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {showCreationModal()}
      {showManageModal()}
      {showDeleteModal()}
      <View style={[ManageStyles.btnLayout]}>
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

      <View style={ManageStyles.tableLayout}>{getAllObjects()}</View>
    </ScrollView>
  );
}