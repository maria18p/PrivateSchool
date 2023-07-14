import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { getManagePairingsData, updatePairing } from '../../../../api/Pairing_requests';
import { useSelector } from 'react-redux';
import { SelectList } from 'react-native-dropdown-select-list';

const Pairings = () => {
  const userData = useSelector((state) => state.user);
  const [pairings, setPairings] = useState(null);
  const [pairingToUpdate, setPairingToUpdate] = useState(null);

  useEffect(() => {
    fetchPairings();
  }, []);

  const fetchPairings = async () => {
    const allPairings = await getManagePairingsData({});
    setPairings(allPairings.data);
  };

  const sendUpdate = async () => {
    const queryResult = await updatePairing({
      pairing: pairingToUpdate,
    });
    Alert.alert(queryResult.message);
    setPairingToUpdate(null);
    await fetchPairings();
  };

  const showPairings = () => {
    if (!pairings) return <></>;
    return (
      <View>
        {pairings.map((pairing, index) => {
          if (pairing.teacher && pairing.availableTeachers) {
            let adaptedTeacherList = pairing.availableTeachers.map((teacher) => {
              const listObj = {
                key: teacher._id,
                value: teacher.firstName + ' ' + teacher.lastName,
              };
              return listObj;
            });
            return (
              <TouchableOpacity onPress={() => setPairingToUpdate(pairing)} key={index}>
                <Text>
                  {pairing.student.firstName} {pairing.student.lastName}
                </Text>
                <Text>
                  {pairing.teacher.firstName} {pairing.teacher.lastName}
                </Text>
                <Text>{pairing.subject.name}</Text>
                <SelectList
                  data={adaptedTeacherList}
                  setSelected={(teacherID) => {
                    const toUpdate = {
                      _id: pairing._id,
                      student: { _id: pairing.student._id },
                      subject: { _id: pairing.subject._id },
                      teacher: { _id: teacherID },
                    };
                    setPairingToUpdate(toUpdate);
                  }}
                />
                <TouchableOpacity onPress={() => sendUpdate()}>
                  <Text>update</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }
          return <></>;
        })}
      </View>
    );
  };

  const showChangePairing = () => {
    if (!pairingToUpdate) return <></>;
    // return <NotificationActionModal
    // type={actionData.type}
    // data={actionData.data}
    // closeModal={() => setSelectedPairing(null)}
    // />
  };

  return (
    <View>
      <Text>Pairings</Text>
      {showPairings()}
      {showChangePairing()}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Pairings;
