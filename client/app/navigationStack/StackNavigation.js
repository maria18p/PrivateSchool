import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Auth/Login';
import HomeScreen from '../screens/Home/HomePage';
import Notifications from '../screens/Notifications';
import Registration from '../screens/Registration/Registration';
import Messages from '../screens/Messages/Messages';
import img1 from '../assets/bg/welcome4.jpeg';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();

const styleOptions = {
   headerShown: true,
   headerBackground: () => (
      <Image
         source={img1}
         style={{ width: '100%', height: '100%', resizeMode: 'cover', opacity: 0.9 }}
      />
   ),
   headerTintColor: '#000000',
   headerTitleStyle: {
      fontSize: 32,
      fontFamily: 'DMSerifText-Regular',
   },
};

export const LoginStack = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
         <Stack.Screen name='Registration' component={Registration} options={styleOptions} />
      </Stack.Navigator>
   );
};

export const HomeStack = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name='Notifications' component={Notifications} options={styleOptions} />
         <Stack.Screen name='Chats' component={Messages} options={styleOptions} />
      </Stack.Navigator>
   );
};
