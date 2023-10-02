import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markNotificationsRead } from '../../api/Notification_requests';
import NotificationActionModal from './NotificationActionModal';
import notificationStyles from '../../styles/NotificationsStyle';
import { setUserNotifications } from '../../store/reducer';
import { LinearGradient } from 'expo-linear-gradient';

const Notifications = () => {
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const [notifications, setNotifications] = useState(null);
   const [actionData, setActionData] = useState(null);
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 1000);
      refreshNotifications();
   }, []);

   useEffect(() => {
      fetchNotifications();
   }, []);

   useEffect(() => {
      if (notifications) makeNotificationsRead();
   }, [notifications]);

   const refreshNotifications = async () => {
      const refreshedNotifications = await fetchNotifications();
      if (refreshedNotifications) {
         const unreadNotifications = refreshedNotifications.filter(
            (notification) => !notification.read,
         );
         setNotifications(unreadNotifications);
      }
   };

   const fetchNotifications = async () => {
      try {
         const response = await getNotifications({ user: userData });
         const fetchedNotifications = response.data;
         setNotifications(fetchedNotifications);
      } catch (error) {
         console.error('Error fetching notifications:', error);
      }
   };

   const makeNotificationsRead = async () => {
      try {
         await markNotificationsRead({ notifications: notifications });
         const updatedNotification = (await getNotifications({ user: userData })).data;
         dispatch(setUserNotifications({ notifications: updatedNotification }));
      } catch (error) {
         console.error('Error marking notifications as read:', error);
      }
   };

   const determineNotificationType = (notification) => {
      if (notification.type === 'pair') return pairingRequestNotification(notification);
      return messageRequestNotification(notification);
   };

   const toggleNotificationDetails = (notification) => {
      notification.expanded = !notification.expanded;
      setNotifications([...notifications]);
   };

   const showNotifications = () => {
      if (notifications === null) return <Text>Loading notifications...</Text>;
      if (!notifications || notifications.length === 0) {
         return <Text>No notifications available.</Text>;
      }
      return (
         <>
            {notifications.map((notification, key) => (
               <TouchableOpacity onPress={() => toggleNotificationDetails(notification)} key={key}>
                  <View
                     style={[
                        [
                           notificationStyles.eachNotificationContainer,
                           { backgroundColor: '#00B8F5' },
                        ],
                        notification.read && notificationStyles.readNotificationContainer,
                     ]}>
                     {determineNotificationType(notification)}
                  </View>
               </TouchableOpacity>
            ))}
         </>
      );
   };

   const messageRequestNotification = (notification) => {
      const teacherSign = '📚';
      const firstName = notification.payload?.firstName || '';
      const lastName = notification.payload?.lastName || '';
      return (
         <>
            <Text
               style={[
                  notificationStyles.nameTxt,
                  notification.read && [notificationStyles.nameTxt, { color: '#40476D' }],
               ]}>
               {firstName !== '' && lastName !== ''
                  ? firstName + ' ' + lastName + ' ' + teacherSign
                  : ''}
            </Text>
            <View style={notificationStyles.txtLayout}>
               <Text
                  style={[
                     [notificationStyles.txt, { color: '#fff' }],
                     notification.read && notificationStyles.txt,
                  ]}>
                  {notification.text}
               </Text>
            </View>
         </>
      );
   };

   const pairingRequestNotification = (notification) => {
      const someSign = '🎓';
      const firstName = notification.payload?.firstName || 'Unknown';
      const lastName = notification.payload?.lastName || 'Unknown';
      return (
         <>
            <Text
               style={[
                  notificationStyles.nameTxt,
                  notification.read && [notificationStyles.nameTxt, { color: '#40476D' }],
               ]}>
               {firstName + ' ' + lastName} {someSign}
            </Text>
            <View style={notificationStyles.notificationContainer}>
               <View style={notificationStyles.txtLayout}>
                  <Text
                     style={[
                        [notificationStyles.txt, { color: '#000' }],
                        notification.read && notificationStyles.txt,
                     ]}>
                     {notification.text}
                  </Text>
               </View>
               {notification.type === 'pair' && (
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
               )}
            </View>
         </>
      );
   };

   return (
      <LinearGradient
         style={{ justifyContent: 'center', flex: 1 }}
         colors={['#fff', '#91CAF2', '#E7ECEF']}
         start={{ x: 2, y: 0 }}
         end={{ x: 1, y: 1 }}>
         <ScrollView
            style={notificationStyles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
