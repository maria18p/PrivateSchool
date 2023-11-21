import { View, Text, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { SelectList } from 'react-native-dropdown-select-list';
import { RadioButton, TextInput } from 'react-native-paper';
import {
   getAllSubjects,
   makeAssignTeacherSubjectRequest,
   makeCreateSubjectRequest,
} from '../../api/Subject_requests';
import { useDispatch, useSelector } from 'react-redux';
import modalStyle from '../../styles/ModalStyles';

export default function NewSubjectModal(props) {
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const [subject, setSubject] = useState('');
   const [selected, setSelected] = useState(1);
   const [allSubjects, setAllSubjects] = useState([]);

   useEffect(() => {
      getSubjects();
   }, []);

   const getSubjects = async () => {
      const res = await getAllSubjects({
         user: userData,
      });
      setAllSubjects(res.data);
   };

   const submit = async () => {
      const subRes = await makeAssignTeacherSubjectRequest({
         user: userData,
         teacher: userData,
         subject: {
            name: subject,
         },
      });
      Alert.alert(subRes.message);
      props.setModalShown(false);
   };

   const createNew = async () => {
      if (allSubjects.some((existingSubject) => existingSubject.name === subject)) {
         return Alert.alert('Subject is already exists');
      }
      const resCreate = await makeCreateSubjectRequest({
         user: userData,
         subject: {
            name: subject,
         },
      });

      Alert.alert(resCreate.data.message);
      if (resCreate.status === 200) await submit();
   };

   const toggleRadioSelection = (selection) => {
      if (selected == selection) return;
      setSubject('');
      setSelected(selection);
   };

   const selectSubject = (subject) => {
      setSubject(subject);
   };

   const showContent = () => {
      let adaptedSubjectsList = [];
      allSubjects.forEach((subject) => adaptedSubjectsList.push(subject.name));
      if (selected === 1) {
         return (
            <>
               <View style={modalStyle.selectListContainer}>
                  <SelectList
                     setSelected={(val) => selectSubject(val)}
                     data={adaptedSubjectsList}
                     save={subject}
                  />
               </View>
               <View style={modalStyle.btnLayout}>
                  <Button title='Submit' onPress={() => submit()} />
               </View>
            </>
         );
      } else {
         return (
            <>
               <View style={modalStyle.txtInpContainer}>
                  <TextInput
                     style={modalStyle.txtInputSubModal}
                     placeholder='Enter new subject name'
                     onChangeText={(text) => setSubject(text)}
                  />
               </View>
               <View style={modalStyle.btnLayout}>
                  <Button title='Create' onPress={() => createNew()} />
               </View>
            </>
         );
      }
   };

   return (
      <Modal
         isVisible={true}
         animationIn='slideInUp'
         backdropColor='#6969B3'
         backdropOpacity={0.35}>
         <View style={[modalStyle.modalContainer, { width: '100%' }]}>
            <View style={modalStyle.radioBtnContainer}>
               <RadioButton
                  value='1'
                  status={selected === 1 ? 'checked' : 'unchecked'}
                  onPress={() => toggleRadioSelection(1)}
               />
               <Text style={modalStyle.fontTxtModal}>Choose From Existing</Text>
            </View>
            <View style={modalStyle.radioBtnContainer}>
               <RadioButton
                  value='2'
                  status={selected === 2 ? 'checked' : 'unchecked'}
                  onPress={() => toggleRadioSelection(2)}
               />
               <Text style={modalStyle.fontTxtModal}>Create New</Text>
            </View>

            {showContent()}
            <View style={[modalStyle.btnLayout, { marginTop: 6 }]}>
               <Button title='Cancel' onPress={() => props.setModalShown(false)} />
            </View>
         </View>
      </Modal>
   );
}
