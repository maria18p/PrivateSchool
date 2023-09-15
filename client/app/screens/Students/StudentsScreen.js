import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import { getAllUsers, updateStudentActive, updateStudentInactive } from '../../api/User_requests';
import { useSelector } from 'react-redux';
import { getTeacherStudents } from '../../api/Pairing_requests';
import styles from '../../styles/StudentsStyle';
import { LinearGradient } from 'expo-linear-gradient';

const Students = () => {
   const [myStudents, setMyStudents] = useState(null);
   const [allStudents, setAllStudents] = useState(null);
   const userData = useSelector((state) => state.user);
   const [mode, setMode] = useState(null);

   useEffect(() => {
      refreshAll();
   }, []);

   useEffect(() => {
      if (myStudents != null) setMode(myStudents);
   }, [myStudents]);

   const refreshAll = async () => {
      getMyStudents();
      if (userData.role === 'Admin') updateAllStudents();
   };

   const handleStudentPressed = (student) => {};

   const getMyStudents = async () => {
      const myStudents = await getTeacherStudents({
         user: userData,
         token: userData.token,
      });
      setMyStudents(myStudents.data);
   };

   const updateAllStudents = async () => {
      const queryResult = await getAllUsers({
         user: userData,
         role: 'Student',
      });

      setAllStudents(queryResult.data);
   };

   const studentData = () => {
      if (!mode) return <></>;
      return (
         <LinearGradient
            colors={['#86BBD8', '#F69865', '#ffff']}
            start={{ x: 2, y: 1 }}
            end={{ x: 0, y: 0 }}>
            {mode.map((student, key) => {
               return (
                  <DataTable.Row
                     style={{ marginLeft: 10 }}
                     key={key}
                     onPress={() => handleStudentPressed(student)}>
                     <DataTable.Cell textStyle={styles.cell}>{student.firstName}</DataTable.Cell>
                     <DataTable.Cell numeric textStyle={styles.cell}>
                        {student.lastName}
                     </DataTable.Cell>
                     <DataTable.Cell numeric textStyle={styles.cell}>
                        {student.isActive ? 'Active' : 'Not Active'}
                     </DataTable.Cell>
                     <DataTable.Cell numeric textStyle={styles.cell}>
                        {student.isActive ? (
                           <TouchableOpacity key={key} onPress={() => setStudentInactive(student)}>
                              <Text style={{ textAlign: 'center' }}>Set Inactive</Text>
                           </TouchableOpacity>
                        ) : (
                           <TouchableOpacity key={key} onPress={() => setStudentActive(student)}>
                              <Text style={{ textAlign: 'center' }}>Set Active</Text>
                           </TouchableOpacity>
                        )}
                     </DataTable.Cell>
                  </DataTable.Row>
               );
            })}
         </LinearGradient>
      );
   };

   const setStudentInactive = async (student) => {
      const queryResult = await updateStudentInactive({
         user: userData,
         student: student,
      });
      Alert.alert(queryResult.message);
      await refreshAll();
   };

   const setStudentActive = async (student) => {
      const queryResult = await updateStudentActive({
         user: userData,
         student: student,
      });
      // console.log(queryResult);
      Alert.alert(queryResult.message);
      await refreshAll();
   };

   const screenOptions = () => {
      if (userData.role !== 'Admin') return <></>;
      return (
         <LinearGradient
            colors={['#000000', '#69EBD0 ', '#16A286']}
            start={{ x: 2, y: 1 }}
            end={{ x: 0, y: 0 }}>
            <View style={styles.btnLayout}>
               <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={() => {
                     refreshAll();
                  }}>
                  <Text style={styles.txtBtn}>Refresh</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={() => {
                     setMode(myStudents);
                  }}>
                  <Text style={styles.txtBtn}>My Students</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={() => {
                     setMode(allStudents);
                  }}>
                  <Text style={styles.txtBtn}>All Students</Text>
               </TouchableOpacity>
            </View>
         </LinearGradient>
      );
   };

   return (
      <View style={{ flex: 1, height: '100%' }}>
         {screenOptions()}
         {/* <ScrollView> */}
         <DataTable>
            <DataTable.Header style={styles.tblHeader}>
               <DataTable.Title textStyle={{ fontSize: 15 }}>Name</DataTable.Title>
               <DataTable.Title textStyle={{ fontSize: 15 }}>Last name</DataTable.Title>
               <DataTable.Title textStyle={{ fontSize: 15, marginLeft: -10 }}>
                  Active
               </DataTable.Title>
            </DataTable.Header>
            {studentData()}
         </DataTable>
         {/* </ScrollView> */}
      </View>
   );
};

export default Students;
