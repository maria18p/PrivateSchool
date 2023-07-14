import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserData = async (state) => {
  await saveData('appUser', state);
};

const saveData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.log(e);
  }
};

const loadUserData = async () => {
  return JSON.parse(await AsyncStorage.getItem('appUser'));
};

const logout = () => {
  AsyncStorage.removeItem('appUser');
  console.log('User data cleared');
};

const actions = {
  saveUserData,
  loadUserData,
  logout,
};

export default actions;
