import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import { getAllUsers, updateStudentActive, updateStudentInactive } from '../../api/User_requests';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherStudents } from '../../api/Pairing_requests';
import styles from '../../styles/StudentsStyle';
import { LinearGradient } from 'expo-linear-gradient';

const Students = () => {
   const backgroundImage = require('../../assets/students_bg.jpeg');

   const [myStudents, setMyStudents] = useState(null);
   const [allStudents, setAllStudents] = useState(null);
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const [mode, setMode] = useState(null);

   useEffect(() => {
      refreshAll();
   }, []);

   useEffect(() => {
      if (myStudents != null) setMode(myStudents);
   }, [myStudents]);

   const refreshAll = async () => {
      getMyStudents();
      if (userData.role === 'Admin' || userData.role === 'Teacher') updateAllStudents();
   };

   const handleStudentPressed = (student) => {};

   const updateAllStudents = async () => {
      const queryResult = await getAllUsers({
         user: userData,
         role: 'Student',
      });

      setAllStudents(queryResult.data);
   };

   const getMyStudents = async () => {
      const myStudents = await getTeacherStudents({
         user: userData,
         token: userData.token,
      });
      setMyStudents(myStudents.data);
   };

   const studentData = () => {
      if (!mode) return <></>;
      return (
         <LinearGradient
            colors={['#B7B5E4', '#95F9E3', '#E0CA3C']}
            start={{ x: 0, y: -1 }}
            end={{ x: 1.3, y: -2 }}>
            {mode.map((student, key) => {
               return (
                  <DataTable.Row
                     key={key}
                     onPress={() => handleStudentPressed(student)}
                     style={{ marginBottom: 5, borderBottomWidth: 2 }}>
                     <DataTable.Cell textStyle={styles.cell}>
                        <Text>
                           {student.firstName} {student.lastName}
                        </Text>
                     </DataTable.Cell>
                     <DataTable.Cell
                        style={{ marginLeft: 35, marginBottom: 0 }}
                        textStyle={styles.cell}>
                        <Text style={{ fontSize: 14, color: '#141B41' }}>{student.email}</Text>
                     </DataTable.Cell>
                     <DataTable.Cell
                        numeric
                        textStyle={styles.cell}
                        style={{ marginLeft: 25, marginBottom: 0 }}>
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
      Alert.alert(queryResult.message);
      await refreshAll();
   };

   const screenOptions = () => {
      if (userData.role === 'Admin') {
         return (
            <ImageBackground source={backgroundImage}>
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
            </ImageBackground>
         );
      } else if (userData.role === 'Teacher') {
         return (
            <ImageBackground source={backgroundImage}>
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
               </View>
            </ImageBackground>
         );
      } else {
         return <></>; // Handle other roles here
      }
   };

   return (
      <View style={styles.containerStudentsScreen}>
         {screenOptions()}
         <ScrollView>
            <DataTable>
               <DataTable.Header style={styles.tblHeader}>
                  <DataTable.Title textStyle={{ fontSize: 14 }}>Full name</DataTable.Title>
                  <DataTable.Title textStyle={{ fontSize: 14 }}>Email</DataTable.Title>
                  <DataTable.Title textStyle={{ fontSize: 14, marginLeft: -30 }}>
                     Status
                  </DataTable.Title>
               </DataTable.Header>
               {studentData()}
            </DataTable>
         </ScrollView>
      </View>
   );
};

export default Students;
