import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SubjectEditModal from './SubjectEditModal';
import NewSubjectModal from './NewSubjectModal';
import { getUserSubjects } from '../../api/Subject_requests';
import styles from '../../styles/carcassStyles';
import subjectStyle from '../../styles/SubjectStyles';
import { removeSubjectFromUserList } from '../../api/User_requests';
import ManageStyles from '../../styles/ManageOptionStyles';
import { Icon } from 'react-native-elements';

export default function Subjects() {
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const [mySubjects, setMySubjects] = useState([]);
   const [selectedSubject, setSelectedSubject] = useState(null);
   const [newSubModalShown, setNewSubModalShown] = useState(false);

   const updateSubjects = async () => {
      const res = await getUserSubjects({
         user: userData,
      });
      setMySubjects(res.data);
   };

   useEffect(() => {
      if (!selectedSubject) updateSubjects();
   }, [selectedSubject]);

   useEffect(() => {
      updateSubjects();
   }, [newSubModalShown]);

   const showSubjectModal = () => {
      if (!selectedSubject || userData.role === 'Student') return <></>;
      return (
         <SubjectEditModal subject={selectedSubject} closeModal={() => setSelectedSubject(null)} />
      );
   };

   const showNewSubjectModal = () => {
      if (newSubModalShown) return <NewSubjectModal setModalShown={setNewSubModalShown} />;
   };

   const generateSubjects = () => {
      return (
         <View style={subjectStyle.generateSubjectsContainer}>
            {mySubjects.map((subject, index) => {
               return (
                  <View style={subjectStyle.subListLayout} key={index}>
                     <TouchableOpacity
                        style={{ justifyContent: 'center' }}
                        onPress={() => setSelectedSubject(subject)}>
                        <Text style={subjectStyle.txtSubName}>{subject.name}</Text>
                     </TouchableOpacity>
                     {userData.role === 'Admin' ? (
                        <TouchableOpacity
                           style={ManageStyles.btnContainer}
                           onPress={() => handleRemoveSubject(subject)}>
                           <Icon name='delete' type='ionicons' size={26} />
                        </TouchableOpacity>
                     ) : (
                        <></>
                     )}
                  </View>
               );
            })}
         </View>
      );
   };

   const handleRemoveSubject = async (subject) => {
      Alert.alert(
         'Confirmation',
         'Are you sure you want to remove this subject?',
         [
            {
               text: 'Cancel',
               style: 'cancel',
            },
            {
               text: 'Proceed',
               onPress: async () => {
                  try {
                     await removeSubjectFromUserList({
                        user: {
                           _id: userData._id,
                        },
                        subject: subject,
                     });
                     await updateSubjects();
                  } catch (err) {
                     console.log(err);
                  }
               },
            },
         ],
         { cancelable: false },
      );
   };

   const roleNewSubjectAction = () => {
      if (userData.role === 'Student') {
         return <></>;
      }
      if (userData.role === 'Teacher' || userData.role === 'Admin') {
         return (
            <TouchableOpacity style={styles.loginButton} onPress={() => setNewSubModalShown(true)}>
               <Text style={subjectStyle.txtNewSub}>Add Subject</Text>
            </TouchableOpacity>
         );
      }
   };

   return (
      <>
         <View style={subjectStyle.showSubModalContainer}>
            {showSubjectModal()}
            <View style={[subjectStyle.subLayout, { overflow: 'hidden' }]}>
               <Image
                  style={{
                     resizeMode: 'cover',
                     height: 55,
                     width: 100,
                     opacity: 0.6,
                     zIndex: -1000,
                     transform: [{ scale: 5 }, { rotate: '15deg' }],
                  }}
                  source={require('../../assets/logo/musicLogo2.jpeg')}
               />
               <Text style={subjectStyle.txtMySubjects}>my subjects</Text>
            </View>
            {generateSubjects()}
            {showNewSubjectModal()}
         </View>

         <View style={subjectStyle.roleNewSubjectActionLayout}>{roleNewSubjectAction()}</View>
      </>
   );
}
