import { View, Text, Button, Alert, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
import Modal from 'react-native-modal';
import { getPairings, pairTeacherToStudent } from '../../api/Pairing_requests';
import { useDispatch, useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';
import modalStyle from '../../styles/ModalStyles';
import notificationStyle from '../../styles/NotificationsStyle.js';
import { DataTable } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const pairingReducer = (state, action) => {
  switch (action.type) {
    case 'fetch':
      return { ...state, pairings: action.payload };
    case 'assign':
      const teacherID =
        state.pairings[action.payload.pairingIndex].availableTeachers[action.payload.teacherIndex]
          ._id;
      state.pairings[action.payload.pairingIndex].teacher = teacherID;
      return { ...state, pairings: state.pairings };
  }
};

export default function NotificationActionModal(props) {
  const [pairings, setPairings] = useState([]);
  const [noMoreSubjectsPaired, setNoMoreSubjectsPaired] = useState(false);

  const userData = useSelector((state) => state.user);
  const [state, pairingsDispatcher] = useReducer(pairingReducer, {
    pairings: [],
  });

  useEffect(() => {
    getStudentPairings();
  }, []);

  const getStudentPairings = async () => {
    const queryResult = await getPairings({
      user: userData,
      participant: props.data._id,
      role: props.data.role,
      status: 'unassigned',
    });

    if (queryResult.data.length === 0) {
      setNoMoreSubjectsPaired(true);
    } else {
      setNoMoreSubjectsPaired(false);
    }

    pairingsDispatcher({
      type: 'fetch',
      payload: queryResult.data,
    });

    setPairings(queryResult.data);
  };

  const handlePairing = async (pairIndex) => {
    if (pairings[pairIndex].teacher === null) {
      Alert.alert('Please select a teacher');
      return;
    }

    const pairingResult = await pairTeacherToStudent({
      user: userData,
      pairing_id: pairings[pairIndex]._id,
      teacher: pairings[pairIndex].teacher,
    });

    if (pairingResult.success) {
      Alert.alert(pairingResult.message);
      getStudentPairings();
    } else {
      Alert.alert(pairingResult.message);
    }
  };

  const showSubjectPairings = () => {
    if (noMoreSubjectsPaired) {
      return (
        <View style={notificationStyle.noMoreSubjectsContainer}>
          <Text style={notificationStyle.noMoreSubjectsText}>
            No more subjects available for pairing.
          </Text>
        </View>
      );
    }

    if (pairings.length === 0) return <></>;
    return (
      <View style={notificationStyle.scrollViewLayout}>
        <ScrollView>
          <DataTable style={{ marginTop: 35 }}>
            <DataTable.Header style={notificationStyle.tableHeader}>
              <DataTable.Title textStyle={notificationStyle.dataTableTxtStyle}>
                subject
              </DataTable.Title>
              <DataTable.Title textStyle={notificationStyle.dataTableTxtStyle}>
                option
              </DataTable.Title>
              <DataTable.Title numeric textStyle={notificationStyle.dataTableTxtStyle}>
                action
              </DataTable.Title>
            </DataTable.Header>
            {pairings.map((pairing, index) => {
              let teachers = [];
              if (pairing.availableTeachers) {
                teachers = pairing.availableTeachers.map((teacher, index) => {
                  return {
                    key: index,
                    value: teacher.firstName + ' ' + teacher.lastName,
                  };
                });
              }
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell textStyle={notificationStyle.tableCell}>
                    {pairing.subjectName}
                  </DataTable.Cell>
                  <View style={{ width: '45%' }}>
                    <SelectList
                      setSelected={(teacherIndex) => {
                        pairingsDispatcher({
                          type: 'assign',
                          payload: {
                            pairingIndex: index,
                            teacherIndex: teacherIndex,
                          },
                        });
                      }}
                      data={teachers}
                    />
                  </View>
                  <DataTable.Cell numeric>
                    <Button title='Pair' onPress={() => handlePairing(index)} />
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </ScrollView>
      </View>
    );
  };

  return (
    <Modal isVisible={true} animationIn='slideInUp' backdropColor='#6969B3' backdropOpacity={0.35}>
      <SafeAreaView style={notificationStyle.modalContainer}>
        <LinearGradient
          colors={['#F05D5E', '#D8A47F', '#E7ECEF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={notificationStyle.modalNameContainer}>
            <Text style={notificationStyle.modalTxtStyle}>Student:</Text>
            <Text style={notificationStyle.modalTxtStyle}>
              {props.data.firstName + ' ' + props.data.lastName}
            </Text>
          </View>
        </LinearGradient>
        {showSubjectPairings()}
        <View style={modalStyle.btnLayout}>
          <Button title='Close' onPress={() => props.closeModal()} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}
