import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markNotificationsRead } from '../../api/Notification_requests';
import NotificationActionModal from './NotificationActionModal';
import notificationStyles from '../../styles/NotificationsStyle';
import { setUserNotifications } from '../../store/reducer';
import { LinearGradient } from 'expo-linear-gradient';

const Notifications = () => {
   const [notifications, setNotifications] = useState(null);
   const [actionData, setActionData] = useState(null);

   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      fetchNotifications();
   }, []);

   useEffect(() => {
      if (notifications) makeNotificationsRead();
   }, [notifications]);

   const fetchNotifications = async () => {
      setNotifications((await getNotifications({ user: userData })).data);
   };

   const makeNotificationsRead = async () => {
      await markNotificationsRead({ notifications: notifications });
      const updatedNotification = (await getNotifications({ user: userData })).data;
      dispatch(setUserNotifications({ notifications: updatedNotification }));
   };

   const determineNotificationType = (notification) => {
      if (notification.type === 'pair') return pairingRequestNotification(notification);
      if (notification.type === 'newTeacher') return messageRequestNotification(notification);
   };

   const showNotifications = () => {
      if (notifications === null) return <></>;
      return (
         <>
            {notifications.map((notification, key) => {
               return (
                  <View
                     style={[
                        [
                           notificationStyles.eachNotificationContainer,
                           { backgroundColor: '#FFC15E' },
                        ],
                        notification.read && notificationStyles.readNotificationContainer,
                     ]}
                     key={key}>
                     {determineNotificationType(notification)}
                  </View>
               );
            })}
         </>
      );
   };

   const messageRequestNotification = (notification) => {
      // console.log('[NOTIFICATION ] ', notification.type);
      // console.log('========');
      return (
         <>
            <Text
               style={[
                  notificationStyles.nameTxt,
                  notification.read && [notificationStyles.nameTxt, { color: '#2E5EAA' }],
               ]}>
               {notification.payload.firstName + ' ' + notification.payload.lastName}
            </Text>
            <View style={notificationStyles.txtLayout}>
               <Text
                  style={[
                     [notificationStyles.txt, { color: '#000' }],
                     notification.read && notificationStyles.txt,
                  ]}>
                  {notification.text}
               </Text>
            </View>
         </>
      );
   };

   const pairingRequestNotification = (notification) => {
      return (
         <>
            <Text
               style={[
                  notificationStyles.nameTxt,
                  notification.read && [notificationStyles.nameTxt, { color: '#2E5EAA' }],
               ]}>
               {notification.payload.firstName + ' ' + notification.payload.lastName}
            </Text>
            <View style={notificationStyles.notificationContainer}>
               <View style={notificationStyles.txtLayout}>
                  <Text
                     style={[
                        [notificationStyles.txt, { color: '#ffff', fontWeight: '500' }],
                        notification.read && notificationStyles.txt,
                     ]}>
                     {notification.text}
                  </Text>
               </View>
               <TouchableOpacity
                  style={notificationStyles.btn}
                  onPress={() =>
                     setActionData({
                        type: notification.type,
                        data: notification.payload,
                     })
                  }>
                  <Text style={notificationStyles.btnTxt}>Show</Text>
               </TouchableOpacity>
            </View>
         </>
      );
   };

   return (
      <LinearGradient
         style={{ justifyContent: 'center', flex: 1, borderWidth: 2 }}
         colors={['#fff', '#91CAF2', '#E7ECEF']}
         start={{ x: 2, y: 0 }}
         end={{ x: 1, y: 1 }}>
         <ScrollView style={notificationStyles.container}>
            {showNotifications()}
            {actionData ? (
               <NotificationActionModal
                  type={actionData.type}
                  data={actionData.data}
                  closeModal={() => setActionData(null)}
               />
            ) : (
               <></>
            )}
         </ScrollView>
      </LinearGradient>
   );
};

export default Notifications;
