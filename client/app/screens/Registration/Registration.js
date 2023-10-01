import {
   Text,
   View,
   TextInput,
   TouchableOpacity,
   Alert,
   Button,
   ScrollView,
   SafeAreaView,
} from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
import { Icon } from 'react-native-elements';
import { faker } from '@faker-js/faker';
import { makeRegisterStudentRequest, makeRegisterTeacherRequest } from '../../api/User_requests';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import styles from '../../styles/carcassStyles';
import { RadioButton } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { getAllSubjects } from '../../api/Subject_requests';
import registerStyle from '../../styles/RegisterFormStyles';

const STUDENT_MODE = 1;
const TEACHER_MODE = 2;

const subjectReducer = (state, action) => {
   switch (action.type) {
      case 'add':
         if (state.subjects.includes(action.payload)) return { ...state, subjects: state.subjects };
         state.subjects.push(action.payload);
         return { ...state, subjects: state.subjects };
      case 'remove':
         state.subjects.splice(state.subjects.indexOf(action.payload));
         return { ...state, subjects: state.subjects };
      case 'clear':
         state.subjects = [];
         return { ...state, subjects: state.subjects };
   }
};

const fakeFirstName = faker.person.firstName();
const fakeLastName = faker.person.lastName();
const fakeEmail = faker.internet.email();

export default function Registration({ navigation }) {
   const dispatch = useDispatch();

   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [code, setCode] = useState('');
   const [regMode, setRegMode] = useState(STUDENT_MODE);
   const [allSubjects, setAllSubjects] = useState([]);
   const [isCodeCorrect, setIsCodeCorrect] = useState(true);
   const [incorrectAttempts, setIncorrectAttempts] = useState(0);
   const [disableRegistration, setDisableRegistration] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [subjectsState, subjectsDispatcher] = useReducer(subjectReducer, {
      subjects: [],
   });

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   useEffect(() => {
      getSubjects();
   }, []);

   useEffect(() => {
      setEmail('');
      setFirstName('');
      setLastName('');
      setCode('');
      setPhoneNumber('');
      subjectsDispatcher({
         type: 'clear',
         payload: {},
      });
      setPassword(generateRandomPassword());
   }, [regMode]);

   const getSubjects = async () => {
      const res = await getAllSubjects();
      setAllSubjects(res.data);
   };

   // generate a random password
   const generateRandomPassword = () => {
      const symbols = '!@#$%^&*()_-+={}[]:;<>,.?/~';
      const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const digits = '0123456789';
      const passwordLength = 12;
      let password = '';
      for (let i = 0; i < passwordLength; i++) {
         const category = Math.floor(Math.random() * 3); // 0 for symbols, 1 for letters, 2 for digits
         switch (category) {
            case 0:
               password += symbols[Math.floor(Math.random() * symbols.length)];
               break;
            case 1:
               password += letters[Math.floor(Math.random() * letters.length)];
               break;
            case 2:
               password += digits[Math.floor(Math.random() * digits.length)];
               break;
         }
      }
      return password;
   };

   const submit = async () => {
      if (!emailRegex.test(email)) {
         Alert.alert('Please enter a valid email address');
         return;
      }
      if (password === '') {
         Alert.alert('Password Error');
         return;
      }
      regMode === STUDENT_MODE ? registerStudent() : registerTeacher();
   };

   const registerStudent = async () => {
      let subjectIDs = subjectsState.subjects.map((subject) => {
         for (let i = 0; i < allSubjects.length; i++) {
            if (allSubjects[i].name === subject) return allSubjects[i]._id;
         }
      });
      const params = {
         firstName: firstName,
         lastName: lastName,
         email: email,
         password: password,
         phoneNumber: phoneNumber,
         subjects: subjectIDs,
      };
      console.log(params.email, params.firstName, params.lastName, params.phoneNumber);
      try {
         if (email === '' || password === '' || firstName === '' || lastName === '') {
            Alert.alert('All fields are required');
            return;
         }
         if (subjectIDs.length === 0) {
            Alert.alert(
               'Registration Error',
               'Please choose at least one or more subjects to proceed with registration.',
            );
            return;
         }
         const requestResult = await makeRegisterStudentRequest(params);
         Alert.alert(requestResult.message);
         navigation.navigate('Login');
      } catch (e) {
         console.log(e);
      }
   };

   const registerTeacher = async () => {
      let subjectIDs = subjectsState.subjects.map((subject) => {
         for (let i = 0; i < allSubjects.length; i++) {
            if (allSubjects[i].name === subject) return allSubjects[i]._id;
         }
      });
      const params = {
         firstName: firstName,
         lastName: lastName,
         email: email,
         password: password,
         code: code,
         phoneNumber: phoneNumber,
         subjects: subjectIDs,
      };
      try {
         if (email === '' || password === '' || firstName === '' || lastName === '') {
            Alert.alert('All fields are required');
            return;
         } else {
            if (params.code !== '123') {
               setIncorrectAttempts((prevAttempts) => prevAttempts + 1);
               if (incorrectAttempts >= 2) {
                  Alert.alert('Please call the system administrator');
                  setIncorrectAttempts(0); // Reset the counter after three incorrect attempts
                  setDisableRegistration(true); // Disable registration after three incorrect attempts
               } else {
                  Alert.alert('Code incorrect', 'Please try again!');
               }
               setCode(''); // Clear the code input
            } else {
               if (disableRegistration === false) {
                  setIsCodeCorrect(true); // Set the code correctness state to true when it is correct
                  setIncorrectAttempts(0); // Reset the counter after successful login
                  const requestResult = await makeRegisterTeacherRequest(params);
                  Alert.alert(requestResult.message);
                  navigation.navigate('Login'); // Navigate to the login screen on successful registration
               } else return <></>;
            }
         }
      } catch (e) {
         console.log(e);
      }
   };

   const teacherRegistrationAddon = () => {
      return (
         <View style={registerStyle.teacherRegistrationAddonLayout}>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='code' type='ionicons' color='#5352ed' />
               <TextInput
                  style={styles.input}
                  value={code}
                  placeholder='Enter registration code'
                  onChangeText={(text) => setCode(text)}
               />
            </View>
            <View style={registerStyle.txtInputTeachLayout}>
               <Text style={registerStyle.txtToTeach}>I want to teach:</Text>
            </View>
         </View>
      );
   };

   const studentAddons = () => {
      return (
         <View style={registerStyle.txtInputStudentLayout}>
            <Text style={registerStyle.txtToTeach}>I want to learn:</Text>
         </View>
      );
   };

   const subjectSelection = () => {
      if (!regMode) return <></>;
      return (
         <View style={registerStyle.registerFormContainer}>
            {subjectsState.subjects.map((subject, key) => {
               return (
                  <View key={key} style={registerStyle.addedSubjectsContainer}>
                     <View style={registerStyle.addedSubjectName}>
                        <Text style={registerStyle.fontAddedSub}>{subject}</Text>
                     </View>
                     <View style={registerStyle.containerDeleteBtn}>
                        <Button
                           onPress={() => {
                              subjectsDispatcher({
                                 type: 'remove',
                                 payload: { subject },
                              });
                           }}
                           title='Delete'
                        />
                     </View>
                  </View>
               );
            })}
            <SelectList
               setSelected={(val) => {
                  subjectsDispatcher({
                     type: 'add',
                     payload: val,
                  });
               }}
               data={allSubjects.map((subject) => subject.name)}
            />
         </View>
      );
   };

   return (
      <LinearGradient
         colors={['#F2F4FF', '#96C5F7', '#454ADE']}
         style={styles.container}
         start={{ x: 2, y: 1 }}
         end={{ x: 0, y: 0 }}>
         <ScrollView style={[styles.bottomView, { height: '100%', width: '97%' }]}>
            <SafeAreaView style={registerStyle.safeAreaContainer}>
               <View style={registerStyle.radioBtnLayout}>
                  <RadioButton
                     value={STUDENT_MODE}
                     status={regMode === STUDENT_MODE ? 'checked' : 'unchecked'}
                     onPress={() => setRegMode(STUDENT_MODE)}
                  />
                  <Text style={registerStyle.txtRadioBtn}>Student</Text>
               </View>
               <View style={registerStyle.radioBtnLayout}>
                  <RadioButton
                     value={TEACHER_MODE}
                     status={regMode === TEACHER_MODE ? 'checked' : 'unchecked'}
                     onPress={() => setRegMode(TEACHER_MODE)}
                  />
                  <Text style={registerStyle.txtRadioBtn}>Teacher</Text>
               </View>
            </SafeAreaView>

            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='email' type='ionicons' color='#5352ed' />
               <TextInput
                  keyboardType='email-address'
                  placeholder={fakeEmail}
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  textContentType='emailAddress'
                  autoCorrect={true}
                  selectTextOnFocus
                  editable={true}
               />
            </View>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='phone' type='ionicons' color='#5352ed' />
               <TextInput
                  keyboardType='phone-pad'
                  placeholder='Number phone'
                  textContentType='telephoneNumber'
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={(text) => {
                     const formattedText = text.replace(/[^0-9+]/g, '');
                     setPhoneNumber(formattedText);
                  }}
                  editable={true}
               />
            </View>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='person' type='ionicons' color='#5352ed' />
               <TextInput
                  keyboardType='default'
                  placeholder={fakeFirstName}
                  style={styles.input}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  editable={true}
               />
            </View>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='person' type='ionicons' color='#5352ed' />
               <TextInput
                  keyboardType='default'
                  placeholder={fakeLastName}
                  style={styles.input}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  editable={true}
               />
            </View>
            <View style={styles.inputView}>
               <Icon style={styles.inputIcon} name='lock' type='ionicons' color='#5352ed' />
               <TextInput
                  keyboardType='default'
                  placeholder='Password'
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showPassword}
                  editable={true}
               />
               <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Ionicons
                     style={{ marginRight: 10 }}
                     name={showPassword ? 'eye' : 'eye-off'}
                     size={24}
                     color='#888888'
                  />
               </TouchableOpacity>
            </View>
            {regMode === STUDENT_MODE ? studentAddons() : teacherRegistrationAddon()}
            {subjectSelection()}
            <View style={styles.loginButton}>
               <TouchableOpacity onPress={() => submit()}>
                  <Text style={styles.loginButtonText}>Submit</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </LinearGradient>
   );
}
