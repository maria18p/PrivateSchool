import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Auth/Login';
import HomeScreen from '../screens/Home/HomePage';
import Notifications from '../screens/Notifications';
import Registration from '../screens/Registration/Registration';
import Messages from '../screens/Messages/Messages';
import img1 from '../assets/bc_chats.webp';
import { Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const styleOptions = {
  headerShown: true,
  headerBackground: () => (
    <Image source={img1} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
  ),
  headerTintColor: '#000000',
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
};

const CustomHeaderLeft = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('HomeScreen')}
      style={{ paddingRight: 20, paddingLeft: 0 }}>
      <AntDesign name='leftcircleo' size={28} color='black' />
    </TouchableOpacity>
  );
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
      <Stack.Screen
        name='Notifications'
        component={Notifications}
        options={({ navigation }) => ({
          ...styleOptions,
          headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name='Chats'
        component={Messages}
        options={({ navigation }) => ({
          ...styleOptions,
          headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
};
