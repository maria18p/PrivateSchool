import {
   Text,
   TextInput,
   TouchableOpacity,
   View,
   ImageBackground,
   ScrollView,
   RefreshControl,
   KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllUsers,
   getUserChat,
   sendChatMessage,
   removeChatMessage,
} from '../../api/User_requests';
import chatStyle from '../../styles/ChatsStyle';
import { setUserChats } from '../../store/reducer';
import bcImage from '../../assets/bg/bc-chat.jpeg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Messages() {
   const dispatch = useDispatch();
   const userData = useSelector((state) => state.user);

   const [chatPartners, setChatPartners] = useState([]);
   const [messageText, setMessageText] = useState('');
   const [selectedPartner, setSelectedPartner] = useState(null);
   const [chats, setChats] = useState(null);
   const [refreshing, setRefreshing] = useState(false);

   const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 1000);
      refreshMessages();
   }, []);

   useEffect(() => {
      if (chats) dispatch(setUserChats({ chats: chats }));
   }, [chats]);

   useEffect(() => {
      fetchChats();
   }, []);

   const fetchChats = async () => {
      const allUsers = await getAllUsers({
         user: userData,
         role: ['Student', 'Teacher', 'Admin'],
      });

      let chatData = allUsers.data.map((user) => {
         return {
            _id: user._id,
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
         };
      });
      setChatPartners(chatData);
   };

   const showChats = () => {
      return (
         <>
            {chatPartners.map((partner, key) => {
               if (partner._id === userData._id) return <View key={key}></View>;
               return (
                  <TouchableOpacity
                     key={key}
                     onPress={() => setSelectedPartner(partner)}
                     style={chatStyle.rowChatContainer}>
                     <View>
                        <Text style={chatStyle.txtRowChat}>{partner.name}</Text>
                     </View>
                  </TouchableOpacity>
               );
            })}
         </>
      );
   };

   const sendMessage = async (chat) => {
      const params = {
         user: userData,
         chat: chat,
         users: [userData, selectedPartner],
         message: messageText,
      };
      const queryResult = await sendChatMessage(params);
      if (queryResult.success) {
         let userChat = await getUserChat({ user: userData });
         dispatch(setUserChats({ chats: userChat }));
      }
      setMessageText('');
   };

   const refreshMessages = async () => {
      setChats(await getUserChat({ user: userData }));
   };

   const removeMessage = async (message, chosenChat) => {
      try {
         const params = {
            _id: message._id,
            user: { _id: userData._id },
            chat: chosenChat,
         };
         // console.log(`[message._id ${message._id}]`);
         if (!chosenChat) {
            console.error('Invalid chat ID:', chosenChat);
            return;
         }
         const removalResult = await removeChatMessage(params);
         if (removalResult.success) {
            let userChat = await getUserChat({ user: userData });
            dispatch(setUserChats({ chats: userChat }));
            console.log('Message removed successfully');
         } else {
            console.log(removalResult.message);
         }
      } catch (error) {
         console.error(error.message);
      }
   };

   const showSelectedChat = () => {
      if (!selectedPartner) return <></>;
      let chosenChat = null;
      let found = false;
      let chatIndex = 0;
      while (chatIndex < userData.chats.length && !found) {
         let chat = userData.chats[chatIndex];
         if (chat.users.length === 2) {
            chat.users.map((user) => {
               if (user._id === selectedPartner._id) {
                  found = true;
                  chosenChat = chat;
               }
            });
         }
         if (!found) chatIndex++;
      }
      return (
         <View style={chatStyle.selectedChatLayout}>
            {chosenChat &&
               chosenChat.messages.map((message, key) => {
                  let rowMessage = <></>;
                  const messageDate = new Date(message.createdAt);
                  const messageDateString = messageDate.toLocaleDateString();
                  const messageTimeString = messageDate.toLocaleTimeString([], {
                     hour: '2-digit',
                     minute: '2-digit',
                     hour12: false,
                  });
                  const messageDay = messageDate.getDate();
                  const messageMonth = messageDate.toLocaleString('default', {
                     month: 'short',
                  });
                  const messageYear = messageDate.getFullYear();
                  const today = new Date();
                  const currentYear = today.getFullYear();

                  if (message.sender === userData._id) {
                     rowMessage = (
                        <TouchableOpacity
                           onLongPress={() => removeMessage(message, chosenChat)}
                           key={key}>
                           <View style={chatStyle.rowMessageContainer}>
                              <Text style={chatStyle.selectedChatTxt}>{message.message}</Text>
                              <Text style={[chatStyle.selectedChatTxt, chatStyle.dateMessage]}>
                                 You{' '}
                                 {messageDateString === today
                                    ? `today ${messageTimeString}`
                                    : `${messageDay} ${messageMonth}${
                                         messageYear === currentYear ? '' : ' ' + messageYear
                                      } ${messageTimeString}`}
                              </Text>
                           </View>
                        </TouchableOpacity>
                     );
                  } else {
                     rowMessage = (
                        <View
                           style={[chatStyle.rowMessageContainer, { alignItems: 'flex-start' }]}
                           key={key}>
                           <Text style={[chatStyle.selectedChatTxt, { color: '#ffff' }]}>
                              {message.message}
                           </Text>
                           <Text style={[chatStyle.selectedChatTxt, chatStyle.dateMessage]}>
                              {messageDateString === today
                                 ? `today ${messageTimeString}`
                                 : `${messageDay} ${messageMonth}${
                                      messageYear === currentYear ? '' : ' ' + messageYear
                                   } ${messageTimeString}`}
                           </Text>
                        </View>
                     );
                  }
                  return rowMessage;
               })}
            <View style={chatStyle.sendRow}>
               <TextInput
                  style={chatStyle.txtInputContainer}
                  placeholder='Enter message'
                  value={messageText}
                  returnKeyType='send'
                  blurOnSubmit={false}
                  onChangeText={(text) => setMessageText(text)}
                  autoFocus
               />
               <TouchableOpacity onPress={() => sendMessage(chosenChat)} style={chatStyle.btnSend}>
                  <MaterialCommunityIcons
                     name='send'
                     size={32}
                     color='#ffff'
                     style={{ marginRight: 5 }}
                  />
               </TouchableOpacity>
            </View>
         </View>
      );
   };

   return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
         <View style={{ flex: 1 }}>
            <ImageBackground source={bcImage} style={{ flex: 1 }}>
               <View style={chatStyle.layoutSelectedChat}>
                  <ScrollView
                     style={chatStyle.container}
                     contentContainerStyle={chatStyle.contentContainer}
                     refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                     }>
                     <View style={chatStyle.headingLayout}>
                        {selectedPartner && (
                           <View style={chatStyle.materialIconsLayout}>
                              <TouchableOpacity
                                 style={{ marginRight: 12 }}
                                 onPress={() => setSelectedPartner(null)}>
                                 <MaterialCommunityIcons
                                    name='arrow-left-bold-circle-outline'
                                    size={38}
                                    color='#ffff'
                                 />
                              </TouchableOpacity>
                              <TouchableOpacity
                                 onPress={() => refreshMessages()}
                                 activeOpacity={0.5}>
                                 <MaterialCommunityIcons
                                    name='refresh-circle'
                                    size={38}
                                    color='#ffff'
                                 />
                              </TouchableOpacity>
                           </View>
                        )}
                        <View style={chatStyle.nameContainer}>
                           {!selectedPartner ? (
                              <Text style={chatStyle.txtStyle}>Contacts</Text>
                           ) : (
                              <Text style={chatStyle.txtStyle}>{selectedPartner.name}</Text>
                           )}
                        </View>
                     </View>
                     {selectedPartner ? showSelectedChat() : showChats()}
                  </ScrollView>
               </View>
            </ImageBackground>
         </View>
      </KeyboardAvoidingView>
   );
}
