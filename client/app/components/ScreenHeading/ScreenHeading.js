import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { resetUserData, setUserChats, setUserNotifications } from '../../store/reducer';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/carcassStyles';
import headingStyles from '../../styles/ScreenHeadingStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { getNotifications } from '../../api/Notification_requests';
import { getUserChat } from '../../api/User_requests';
import * as ImagePicker from 'expo-image-picker';

const ScreenHeading = () => {
   const navigation = useNavigation();
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();
   const [hamburgerShown, setHamburgerShown] = useState(false);
   const [notifications, setNotifications] = useState(null);
   const [chats, setChats] = useState(null);
   const [selectedAvatar, setSelectedAvatar] = useState(null);

   useEffect(() => {
      updateNotifications();
      updateChats();
   }, []);

   useEffect(() => {
      if (chats) dispatch(setUserChats({ chats: chats }));
   }, [chats]);

   useEffect(() => {
      if (notifications) dispatch(setUserNotifications({ notifications: notifications }));
   }, [notifications]);

   const updateChats = async () => {
      setChats(await getUserChat({ user: userData }));
   };

   const updateNotifications = async () => {
      setNotifications((await getNotifications({ user: userData })).data);
   };

   const Logout = async () => {
      try {
         dispatch(resetUserData());
      } catch (e) {
         console.log('LOGOUT ERROR:\t', e);
      }
   };

   const menu = () => {
      let show = hamburgerShown ? true : false;
      return <Navbar closeMenu={() => setHamburgerShown(false)} show={show} />;
   };

   const refreshData = async () => {
      await updateChats();
      await updateNotifications();
   };

   const pickAvatar = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
         const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
         });
         // console.log('[RESULT ]', result);
         if (!result.assets.uri !== '') {
            const selectedImageUri = result.assets.length > 0 ? result.assets[0].uri : null;
            setSelectedAvatar(selectedImageUri);
         }
      } else {
         Alert.alert('Permission denied');
      }
   };

   const renderProfilePicture = () => {
      if (selectedAvatar) {
         return (
            <Image
               source={{ uri: selectedAvatar }}
               style={{ width: 40, height: 40, borderRadius: 20 }}
            />
         );
      }
      return (
         <TouchableOpacity onPress={pickAvatar} style={headingStyles.avatarBtn}>
            <MaterialCommunityIcons name='camera' size={26} color='#5352ed' />
         </TouchableOpacity>
      );
   };

   return (
      <SafeAreaView style={styles.safeAreaViewHomePage}>
         <LinearGradient
            style={styles.linearStyles}
            colors={['#BAF2E9', '#BAD7F2', '#E7ECEF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.topBar}>
               <View style={headingStyles.headingContainer}>
                  <View style={headingStyles.leftSideHeadingLayout}>
                     <TouchableOpacity
                        onPress={() => setHamburgerShown(!hamburgerShown)}
                        style={headingStyles.threeD_EffectButton}>
                        <MaterialCommunityIcons name='menu' size={26} color='#5352ed' />
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={headingStyles.threeD_EffectButton}>
                        <MaterialCommunityIcons name='android-messages' size={26} color='#5352ed' />
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Chats')}
                        style={headingStyles.threeD_EffectButton}>
                        <MaterialCommunityIcons name='message' size={26} color='#5352ed' />
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => refreshData()}
                        style={headingStyles.threeD_EffectButton}>
                        <MaterialCommunityIcons name='refresh' size={26} color='#5352ed' />
                     </TouchableOpacity>
                  </View>
                  <View style={headingStyles.nameAvatarLayout}>
                     <Text style={styles.txtHelloUser}>Hello {userData.name}</Text>
                     <TouchableOpacity style={headingStyles.avatarBtn} onPress={pickAvatar}>
                        {renderProfilePicture()}
                     </TouchableOpacity>
                  </View>
               </View>
               <View style={headingStyles.logoutBtnLayout}>
                  <TouchableOpacity onPress={Logout}>
                     <MaterialCommunityIcons name='account-arrow-left' size={30} color='#5352ed' />
                  </TouchableOpacity>
               </View>
            </View>
         </LinearGradient>
         {menu()}
      </SafeAreaView>
   );
};

export default ScreenHeading;
