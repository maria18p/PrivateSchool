import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native';
import { DataTable } from 'react-native-paper';
import { getAllUsers, updateStudentActive, updateStudentInactive } from '../../api/User_requests';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherStudents } from '../../api/Pairing_requests';
import styles from '../../styles/StudentsStyle';
import { LinearGradient } from 'expo-linear-gradient';

const Students = () => {
   const dispatch = useDispatch();
   const userData = useSelector((state) => state.user);

   const [refreshing, setRefreshing] = useState(false);
   const [myStudents, setMyStudents] = useState(null);
   const [allStudents, setAllStudents] = useState(null);
   const [mode, setMode] = useState(null);

   const onRefresh = useCallback(async () => {
      try {
         await refreshAll();
      } finally {
         setRefreshing(false);
      }
   }, []);

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
            <View style={styles.btnLayout}>
               <TouchableOpacity
                  style={[styles.btnContainer, { borderBottomWidth: 0 }]}
                  onPress={() => {
                     refreshAll();
                  }}>
                  <Text style={[styles.txtBtn, { fontSize: 20 }]}>🔄</Text>
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
                  <Text style={styles.txtBtn}>All</Text>
               </TouchableOpacity>
            </View>
         );
      } else if (userData.role === 'Teacher') {
         return (
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
         );
      } else {
         return <></>;
      }
   };

   const studentData = () => {
      if (!mode || !Array.isArray(mode)) {
         return <></>;
      }
      return (
         <LinearGradient
            colors={['#B7B5E4', '#95F9E3', '#E0CA3C']}
            start={{ x: 0, y: -1 }}
            end={{ x: 1.3, y: -2 }}>
            {mode.map((student, key) => {
               return (
                  <DataTable.Row key={key} style={styles.rowStyle}>
                     <DataTable.Cell textStyle={styles.cellTxt}>
                        {student.firstName} {student.lastName}
                     </DataTable.Cell>
                     <DataTable.Cell textStyle={styles.cellTxt} style={styles.cellEmail}>
                        {student.email}
                     </DataTable.Cell>
                     <DataTable.Cell numeric textStyle={styles.cellTxt} style={styles.status}>
                        {student.isActive ? 'Active' : 'Not Active'}
                     </DataTable.Cell>
                     <DataTable.Cell
                        textStyle={styles.cellTxt}
                        key={key}
                        onPress={() => {
                           student.isActive
                              ? setStudentInactive(student)
                              : setStudentActive(student);
                        }}>
                        {student.isActive ? (
                           <Text style={[styles.cellTxt, { textAlign: 'center' }]}>
                              Set Inactive
                           </Text>
                        ) : (
                           <Text style={[styles.cellTxt, { textAlign: 'center' }]}>Set Active</Text>
                        )}
                     </DataTable.Cell>
                  </DataTable.Row>
               );
            })}
         </LinearGradient>
      );
   };

   return (
      <View style={styles.studentsContainer}>
         {screenOptions()}
         <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <DataTable>
               <DataTable.Header style={styles.tblHeader}>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title textStyle={{ marginLeft: -15 }}>Email</DataTable.Title>
                  <DataTable.Title textStyle={{ marginLeft: -40 }}>Status</DataTable.Title>
               </DataTable.Header>
               {studentData()}
            </DataTable>
         </ScrollView>
      </View>
   );
};

export default Students;
