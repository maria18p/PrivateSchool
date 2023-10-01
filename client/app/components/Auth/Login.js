import { Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../store/reducer';
import { makeLoginRequest, findUserByPhoneNumber, sendCodeToEmail } from '../../api/User_requests';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from '../../styles/carcassStyles';

export default function Login() {
   const dispatch = useDispatch();
   const navigation = useNavigation();

   const [notAuthUser, setNotAuthUser] = useState(null);
   const [userData, setUserData] = useState(null);

   const [showPhoneInput, setShowPhoneInput] = useState(false);
   const [showCodeInput, setShowCodeInput] = useState(false);

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [phone, setPhone] = useState('');
   const [verificationCode, setVerificationCode] = useState('');

   useEffect(() => {
      !showPhoneInput && setPhone('');
      showCodeInput && setShowPhoneInput(!showPhoneInput);
   }, [showPhoneInput]);

   const login = async () => {
      if (notAuthUser != null && notAuthUser.email && notAuthUser.storedPassword) {
         params = { email: notAuthUser.email, password: notAuthUser.storedPassword };
         setNotAuthUser(null);
         setPassword('');
         setEmail('');
      } else {
         params = {
            email: email,
            password: password,
         };
      }
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
      setShowCodeInput(false);
   };

   const transferResetPassword = async () => {
      try {
         if (!phone.trim()) {
            Alert.alert('Please enter your phone number.');
            return;
         }
         const user = await findUserByPhoneNumber(phone);
         setNotAuthUser(Object.assign({}, user.data));

         const result = await sendCodeToEmail(user.data);
         setUserData({ ...result });

         console.log('[CODE ]', result.data.resetCode);

         if (result.success) {
            Alert.alert(result.message);
            setShowPhoneInput(false);
            setShowCodeInput(true);
         } else {
            console.log(result.message);
            Alert.alert(result.message);
         }
      } catch (error) {
         console.error('Error in transferResetPassword:', error);
      }
   };

   const checkCodeAndMakeLogin = async () => {
      try {
         if (verificationCode.toString() === userData.data.resetCode.toString()) {
            await login();
         } else {
            Alert.alert(userData.message);
            // handleForgotPasswordClick();
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <LinearGradient colors={['#F2E9DC', '#1E1B18', '#746D75']} style={styles.container}>
         <SafeAreaView style={styles.welcomeAnimationContainer}>
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
         </SafeAreaView>
         <View style={styles.bottomView}>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='email' type='ionicons' color='#5352ed' />
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
                     keyboardType='phone-pad'
                     style={styles.input}
                     placeholder='Enter your phone number'
                     value={phone}
                     onChangeText={(text) => {
                        const formattedText = text.replace(/[^0-9+]/g, '');
                        if (
                           formattedText.startsWith('+') &&
                           formattedText.lastIndexOf('+') === formattedText.indexOf('+')
                        ) {
                           setPhone('+' + formattedText.substring(1, 13));
                        } else {
                           const newText = formattedText.replace(/\+/g, (match, offset) =>
                              offset === 0 ? match : '',
                           );
                           setPhone(newText.substring(0, 10));
                        }
                     }}
                     editable={true}
                  />
                  <TouchableOpacity
                     onPress={transferResetPassword}
                     style={styles.btnSendResetPassword}>
                     <Text style={{ fontSize: 15 }}>✉️</Text>
                  </TouchableOpacity>
               </View>
            )}

            {showCodeInput && (
               <View style={styles.inputView}>
                  <TextInput
                     style={styles.input}
                     placeholder='Enter code from email'
                     value={verificationCode}
                     onChangeText={(text) => setVerificationCode(text)}
                     autoCorrect={false}
                  />
                  <TouchableOpacity
                     onPress={checkCodeAndMakeLogin}
                     style={styles.btnSendResetPassword}>
                     <Text style={{ fontSize: 15 }}>✉️</Text>
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
