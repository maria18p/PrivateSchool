import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/reducer';
import { makeLoginRequest } from '../../api/User_requests';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from '../../styles/carcassStyles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.user);

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
      console.log(e);
      Alert.alert('Something went wrong');
    } finally {
    }
  };

  return (
    <LinearGradient colors={['#F2F4FF', '#96C5F7', '#454ADE']} style={styles.container}>
      <View style={styles.welcomeAnimationContainer}>
        <Animatable.Text style={styles.titleText} animation='zoomInUp' delay={300}>
          Welcome
        </Animatable.Text>
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
        <View style={styles.registerOptionLoginScreen}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={[styles.registerText, { color: '#5352ed' }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
