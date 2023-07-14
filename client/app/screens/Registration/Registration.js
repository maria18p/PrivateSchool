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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState('');
  const [regMode, setRegMode] = useState(STUDENT_MODE);
  const [allSubjects, setAllSubjects] = useState([]);

  const [subjectsState, subjectsDispatcher] = useReducer(subjectReducer, {
    subjects: [],
  });
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async () => {
    regMode === STUDENT_MODE ? registerStudent() : registerTeacher();
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const res = await getAllSubjects();
    setAllSubjects(res.data);
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setCode('');
    subjectsDispatcher({
      type: 'clear',
      payload: {},
    });
  }, [regMode]);

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
      subjects: subjectIDs,
    };
    try {
      if (email !== '') {
        const requestResult = await makeRegisterStudentRequest(params);
        Alert.alert(requestResult.message);
        navigation.navigate('Login');
      } else Alert.alert('Email is required');
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
      subjects: subjectIDs,
    };
    try {
      if (email !== '') {
        const requestResult = await makeRegisterTeacherRequest(params);
        Alert.alert(requestResult.message);
        navigation.navigate('Login');
      } else Alert.alert('Email is required');
    } catch (e) {
      console.log(e);
    }
  };

  const teacherRegistrationAddon = () => {
    return (
      <View style={{ alignItems: 'center', width: '100%' }}>
        <TextInput
          style={registerStyle.txtInput}
          value={code}
          placeholder='Enter registration code: '
          onChangeText={(text) => setCode(text)}
        />
        <View style={registerStyle.txtInputTeachLayout}>
          <Text style={registerStyle.teachTxtStyle}>I want to teach:</Text>
        </View>
      </View>
    );
  };

  const studentAddons = () => {
    return (
      <View style={registerStyle.txtInputStudentLayout}>
        <Text style={registerStyle.teachTxtStyle}>I want to learn:</Text>
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
      style={[styles.container, { justifyContent: 'center' }]}>
      <ScrollView style={[styles.bottomView, { height: '100%', width: '97%' }]}>
        <SafeAreaView style={registerStyle.safeAreaContainer}>
          <View style={registerStyle.radioBtnLayout}>
            <RadioButton
              value={STUDENT_MODE}
              status={regMode === STUDENT_MODE ? 'checked' : 'unchecked'}
              onPress={() => setRegMode(STUDENT_MODE)}
            />
            <Text style={{ fontSize: 15 }}>Student Registration</Text>
          </View>
          <View style={registerStyle.radioBtnLayout}>
            <RadioButton
              value={TEACHER_MODE}
              status={regMode === TEACHER_MODE ? 'checked' : 'unchecked'}
              onPress={() => setRegMode(TEACHER_MODE)}
            />
            <Text style={{ fontSize: 15 }}>Teacher Registration</Text>
          </View>
        </SafeAreaView>

        <View style={styles.inputView}>
          <Icon style={styles.inputIcon} name='person' type='ionicons' color='#5352ed' />
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
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color='#888888' />
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
