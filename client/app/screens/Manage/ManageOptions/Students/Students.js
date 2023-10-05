import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ManageModal from './ManageModal';
import StudentCreationModal from './StudentCreationModal';
import { getAllUsers } from '../../../../api/User_requests';

export default function Students(props) {
   const [manageModalShown, setManageModalShown] = useState(false);
   const [creationModalShown, setCreationModalShown] = useState(false);
   const [dataObj, setDataObj] = useState('');
   const [data, setData] = useState([]);
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      updateData();
   }, []);

   const updateData = async () => {
      let fetched = [];
      if (props.title === 'Students') {
         fetched = await getAllUsers({ user: userData, role: 'Student' });
         setData(fetched.data);
      }
   };

   const getAllObjects = () => {
      // await getAllUsers({filter: filter})
      return (
         <View>
            <Text>All {props.title}:</Text>
            <TouchableOpacity>
               <View style={{ flexDirection: 'row' }}>
                  <Text>First Name</Text>
                  <Text>Last Name</Text>
                  <Text>Email</Text>
               </View>
            </TouchableOpacity>

            {data.map((obj, index) => {
               return (
                  <TouchableOpacity key={index} onPress={() => handleRowPressed(obj)}>
                     <View style={{ flexDirection: 'row' }}>
                        <Text>{obj.firstName}</Text>
                        <Text>{obj.lastName}</Text>
                        <Text>{obj.email}</Text>
                        <TouchableOpacity>
                           <Text></Text>
                        </TouchableOpacity>
                     </View>
                  </TouchableOpacity>
               );
            })}
         </View>
      );
   };

   const handleRowPressed = (obj) => {
      setDataObj(obj);
   };

   useEffect(() => {
      if (dataObj !== '') setManageModalShown(true);
      else {
         if (manageModalShown) setManageModalShown(false);
      }
   }, [dataObj]);

   const showManageModal = () => {
      if (!manageModalShown) return <></>;
      if (props.title === 'Students')
         return <ManageModal type={props.title} obj={dataObj} closeModal={resetDataObj} />;
   };

   const resetDataObj = () => {
      setDataObj('');
   };

   const closeCreationModal = () => {
      setCreationModalShown(false);
   };

   const showCreationModal = () => {
      if (!creationModalShown) return <></>;
      if (props.title === 'Students')
         return <StudentCreationModal closeModal={closeCreationModal} />;
   };

   return (
      <View>
         {showCreationModal()}
         {showManageModal()}
         <TouchableOpacity onPress={() => props.back()}>
            <Text>Back</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => setCreationModalShown(true)}>
            <Text>Add new</Text>
         </TouchableOpacity>
         {getAllObjects()}
      </View>
   );
}
