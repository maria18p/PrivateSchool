import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Auth/Login';
import HomeScreen from '../screens/Home/HomePage';
import Notifications from '../screens/Notifications';
import Registration from '../screens/Registration/Registration';
import Messages from '../screens/Messages/Messages';
import img1 from '../assets/chats_bg.jpeg';
import { Image } from 'react-native';
// import ResetPasswordScreen from '../screens/ResetPassword/resetPassword';

const Stack = createNativeStackNavigator();

const styleOptions = {
   headerShown: true,
   headerBackground: () => (
      <Image source={img1} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
   ),
   headerTintColor: '#ffff',
   headerTitleStyle: {
      fontSize: 25,
      fontWeight: '500',
      fontFamily: 'CroissantOne-Regular',
   },
};

export const LoginStack = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
         <Stack.Screen name='Registration' component={Registration} options={styleOptions} />
         {/* <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} /> */}
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
