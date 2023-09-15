import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Rooms from './ManageOptions/Rooms/Rooms';
// import Students from './ManageOptions/Students/Students';
import styles from '../../styles/NotificationsStyle';
import ManageStyles from '../../styles/ManageOptionStyles';

export default function Manage() {
   const [managed, setManaged] = useState('');

   const generateOptions = () => {
      const manageOptions = ['Rooms'];
      return (
         <View>
            {manageOptions.map((option, key) => {
               return (
                  <TouchableOpacity
                     style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: '#735CDD',
                        width: '50%',
                        padding: 10,
                        marginTop: 15,
                        borderRadius: 10,
                        borderBottomWidth: 10,
                        borderColor: '#96ABED',
                     }}
                     key={key}
                     onPress={() => setManaged(option)}>
                     <Text style={ManageStyles.txtOption}>{option}</Text>
                  </TouchableOpacity>
               );
            })}
         </View>
      );
   };

   const back = () => {
      setManaged('');
   };

   const showContent = () => {
      if (managed === '') return generateOptions();
      if (managed === 'Rooms') return <Rooms title={managed} back={back} />;
      // if (managed === 'Students') return <Students title={managed} back={back} />;

      return <></>;
   };

   return <View>{showContent()}</View>;
}
