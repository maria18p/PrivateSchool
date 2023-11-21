import { View, Text, Button, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import modalStyle from '../../styles/ModalStyles';
import { updateSubject } from '../../api/Subject_requests';

export default function SubjectEditModal(props) {
   const [subjectName, setSubjectName] = useState(props.subject.name);
   const handleUpdateSubject = async () => {
      props.subject.name = subjectName;
      const queryResult = await updateSubject({
         subject: props.subject,
      });
      Alert.alert(queryResult.message);
      if (queryResult.success) {
         props.closeModal();
      }
   };

   return (
      <Modal
         isVisible={true}
         animationIn='slideInUp'
         backdropColor='#6969B3'
         backdropOpacity={0.35}>
         <View style={modalStyle.editSubModalContainer}>
            <View style={modalStyle.txtModalSubjectLayout}>
               <Text style={modalStyle.txtCurNameSubject}>Name subject:</Text>
               <TextInput
                  style={modalStyle.txtInputUpdateSubject}
                  value={subjectName}
                  onChangeText={(text) => setSubjectName(text)}
               />
            </View>

            <View style={{ marginTop: 15 }}>
               <Button title='Update' onPress={() => handleUpdateSubject()} />
               <Button title='Cancel' onPress={() => props.closeModal()} />
            </View>
         </View>
      </Modal>
   );
}
