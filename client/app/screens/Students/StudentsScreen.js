import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import { getAllUsers, updateStudentActive, updateStudentInactive } from '../../api/User_requests';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherStudents } from '../../api/Pairing_requests';
import styles from '../../styles/StudentsStyle';
import { LinearGradient } from 'expo-linear-gradient';
import Popover from 'react-native-popover-view';

const Students = () => {
   const backgroundImage = require('../../assets/bg/students_bg.jpeg');
   const dispatch = useDispatch();
   const userData = useSelector((state) => state.user);

   const popoverRef = useRef(null);
   const [myStudents, setMyStudents] = useState(null);
   const [allStudents, setAllStudents] = useState(null);
   const [mode, setMode] = useState(null);
   const [openPopoverKey, setOpenPopoverKey] = useState([]);

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

   const handlePopoverOpen = (key) => {
      const updatedPopoverKeys = [...openPopoverKey];
      updatedPopoverKeys[key] = key;
      setOpenPopoverKey(updatedPopoverKeys);
   };

   const handleStudentClick = (key) => {
      const updatedPopoverKeys = [...openPopoverKey];
      updatedPopoverKeys[key] = key;
      setOpenPopoverKey(updatedPopoverKeys);
   };

   const handlePopoverClose = (key) => {
      const updatedPopoverKeys = [...openPopoverKey];
      updatedPopoverKeys[key] = null;
      setOpenPopoverKey(updatedPopoverKeys);
   };

   const ShowPopover = ({ student, popoverKey }) => {
      const isStudentPopoverVisible = openPopoverKey[popoverKey] !== null;
      return (
         <Popover
            ref={popoverRef}
            isVisible={isStudentPopoverVisible}
            popoverStyle={{
               padding: 10,
               backgroundColor: 'white',
               borderRadius: 5,
               shadowColor: '#000000',
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.3,
               shadowRadius: 4,
            }}>
            <TouchableOpacity onPress={() => handlePopoverClose(popoverKey)}>
               <Text>{student.email}</Text>
            </TouchableOpacity>
         </Popover>
      );
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
                  <DataTable.Row
                     key={key}
                     onPress={() => handleStudentClick(key)}
                     style={styles.rowStyle}>
                     <DataTable.Cell textStyle={styles.cellTxt}>
                        <TouchableOpacity
                           onPress={() => handlePopoverOpen(key)}
                           onMouseEnter={() => handlePopoverOpen(key)}
                           onMouseLeave={() => handlePopoverClose(key)}>
                           <Text style={styles.cellTxt}>
                              {student.firstName} {student.lastName}
                           </Text>
                        </TouchableOpacity>
                     </DataTable.Cell>
                     <DataTable.Cell textStyle={styles.cellTxt} style={styles.cellStyleEmail}>
                        <TouchableOpacity
                           onPress={() => handlePopoverOpen(key)}
                           onMouseEnter={() => handlePopoverOpen(key)}
                           onMouseLeave={() => handlePopoverClose(key)}>
                           <Text style={styles.cellTxt}>{student.email}</Text>
                        </TouchableOpacity>{' '}
                        <ShowPopover student={student} key={key} />
                     </DataTable.Cell>
                     <DataTable.Cell numeric textStyle={styles.cellTxt} style={styles.status}>
                        {student.isActive ? 'Active' : 'Not Active'}
                     </DataTable.Cell>
                     <DataTable.Cell textStyle={styles.cellTxt}>
                        {student.isActive ? (
                           <TouchableOpacity key={key} onPress={() => setStudentInactive(student)}>
                              <Text style={styles.setInactive}>Set Inactive</Text>
                           </TouchableOpacity>
                        ) : (
                           <TouchableOpacity key={key} onPress={() => setStudentActive(student)}>
                              <Text style={styles.setInactive}>Set Active</Text>
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
         return <></>;
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
