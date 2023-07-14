import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUserChat, sendChatMessage } from '../../api/User_requests';
import chatStyle from '../../styles/ChatsStyle';
import { setUserChats } from '../../store/reducer';
import bcImage from '../../assets/bc2.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Messages() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      let test = await getUserChat({ user: userData });
      dispatch(setUserChats({ chats: test }));
    }
    setMessageText('');
  };

  const refreshMessages = async () => {
    setChats(await getUserChat({ user: userData }));
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
      <ScrollView style={chatStyle.selectedChatLayout}>
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
                <View style={chatStyle.rowMessageContainer} key={key}>
                  <Text style={chatStyle.selectedChatTxt}>{message.message}</Text>
                  <Text style={[chatStyle.selectedChatTxt, { color: '#141B41', fontSize: 13 }]}>
                    {messageDateString === today
                      ? `today ${messageTimeString}`
                      : `${messageDay} ${messageMonth}${
                          messageYear === currentYear ? '' : ' ' + messageYear
                        } ${messageTimeString}`}
                  </Text>
                </View>
              );
            } else {
              rowMessage = (
                <View
                  style={[
                    chatStyle.rowMessageContainer,
                    { borderBottomColor: '#000', alignItems: 'flex-start' },
                  ]}
                  key={key}>
                  <Text style={[chatStyle.selectedChatTxt, { color: '#ffff' }]}>
                    {message.message}
                  </Text>
                  <Text style={[chatStyle.selectedChatTxt, { color: '#141B41', fontSize: 13 }]}>
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
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
          />
          <TouchableOpacity onPress={() => sendMessage(chosenChat)} style={chatStyle.btnSend}>
            <MaterialCommunityIcons name='send' size={30} color='#ffff' />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={bcImage} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(112, 118, 178, 0.7)' }}>
          <ScrollView
            style={chatStyle.container}
            contentContainerStyle={chatStyle.contentContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={chatStyle.headingLayout}>
              {selectedPartner && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setSelectedPartner(null)}>
                    <MaterialCommunityIcons name='arrow-left' size={30} color='#ffff' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => refreshMessages()} activeOpacity={0.5}>
                    <MaterialCommunityIcons name='refresh' size={30} color='#ffff' />
                  </TouchableOpacity>
                </View>
              )}

              <View style={chatStyle.nameContainer}>
                {!selectedPartner ? (
                  <Text style={[chatStyle.txtStyle, { fontSize: 25 }]}>✉️ ✉️ </Text>
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
  );
}