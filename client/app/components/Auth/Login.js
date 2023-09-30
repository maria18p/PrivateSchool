import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/reducer';
import {
   makeLoginRequest,
   updatePassword,
   findUserByPhoneNumber,
   sendPasswordToUserEmail,
} from '../../api/User_requests';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from '../../styles/carcassStyles';

export default function Login({ navigation }) {
   const dispatch = useDispatch();

   const [showPhoneInput, setShowPhoneInput] = useState(false);
   const [notAuthUser, setNotAuthUser] = useState(null);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phone, setPhone] = useState('');

   useEffect(() => {
      if (!showPhoneInput) setPhone('');
   }, [showPhoneInput]);

   const login = async () => {
      const params = {
         email: email,
         password: password,
      };
      try {
         const requestResult = await makeLoginRequest(params);
         if (requestResult.success) {
            dispatch(updateUser(requestResult.data));
            Alert.alert('You logged in successfully');
            navigation.navigate('HomeScreen');
         } else Alert.alert(requestResult.message);
      } catch (e) {
         console.error(e);
         Alert.alert('Something went wrong');
      }
   };

   const handleForgotPasswordClick = () => {
      setShowPhoneInput(!showPhoneInput);
   };

   const transferResetPassword = async () => {
      try {
         if (!phone.trim()) {
            Alert.alert('Please enter your phone number.');
            return;
         }
         const user = await findUserByPhoneNumber(phone);
         setNotAuthUser({ ...user });
         const result = await sendPasswordToUserEmail(notAuthUser.data);
         if (result.success) {
            const maskedEmail = `${notAuthUser.data.email.slice(
               0,
               3,
            )}.....${notAuthUser.data.email.slice(-2)}@gmail.com`;
            Alert.alert(`Password was sent to email ${maskedEmail}.`);
            setShowPhoneInput(!showPhoneInput);
         } else {
            console.log(result.message);
            Alert.alert(result.message);
         }
      } catch (error) {
         console.error('Error in sendVerificationCode:', error);
      }
   };

   return (
      <LinearGradient colors={['#F2E9DC', '#1E1B18', '#746D75']} style={styles.container}>
         <View style={styles.welcomeAnimationContainer}>
            <Animatable.Image
               source={require('../../assets/bg/welcome1.jpg')}
               style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
               }}
               animation='fadeIn'
               delay={500}
            />
         </View>
         <View style={styles.bottomView}>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='person' type='ionicons' color='#5352ed' />
               <TextInput
                  style={styles.input}
                  placeholder='Email'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
               />
            </View>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='lock' type='ionicons' color='#5352ed' />
               <TextInput
                  style={styles.input}
                  placeholder='Password'
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  autoCorrect={false}
               />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={login}>
               <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnForgotPassword} onPress={handleForgotPasswordClick}>
               <Text style={[styles.registerText, { color: '#5352ed', marginTop: 0 }]}>
                  Forgot password
               </Text>
            </TouchableOpacity>
            {showPhoneInput && (
               <View style={styles.inputView}>
                  <Icon style={styles.inputIcon} name='phone' type='ionicons' color='#5352ed' />
                  <TextInput
                     style={styles.input}
                     placeholder='Enter your phone number'
                     value={phone}
                     onChangeText={(text) => setPhone(text)}
                     autoCorrect={false}
                  />
                  <TouchableOpacity
                     onPress={transferResetPassword}
                     style={styles.btnSendResetPassword}>
                     <Text style={{ fontSize: 20 }}>✉️</Text>
                  </TouchableOpacity>
               </View>
            )}

            <View style={styles.registerOptionLoginScreen}>
               <Text style={styles.registerText}>Don't have an account? </Text>
               <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                  <Text style={[styles.registerText, { color: '#B4CDED' }]}>Register</Text>
               </TouchableOpacity>
            </View>
         </View>
      </LinearGradient>
   );
}
