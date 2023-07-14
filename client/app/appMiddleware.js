import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoggedIn } from './api/User_requests';
import { resetUserData, updateUser } from './store/reducer';
import { HomeStack, LoginStack } from './navigationStack/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Auth/Login';
import HomeScreen from './screens/Home/HomePage';
import { store } from './store/store';
import actions from './store/actions';
import LoadingPage from './screens/Loading/LoadingPage';

const LoadApp = () => {
  const [loaded, setLoaded] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    openApp();
  }, []);

  const openApp = async () => {
    if (store.getState().user.token !== null) {
      setLoaded(true);
      return;
    }
    const savedState = await actions.loadUserData();

    if (savedState && savedState.token) {
      let userAdaptedObj = store.getState().user;
      const res = await checkLoggedIn({
        _id: userAdaptedObj._id,
        token: userAdaptedObj.token,
      });
      if (!res.data) dispatch(resetUserData());
      else dispatch(updateUser(savedState));
    }

    setLoaded(true);
  };

  const showStack = () =>
    userData.token ? (
      <HomeStack>
        <Login />
      </HomeStack>
    ) : (
      <LoginStack>
        <HomeScreen />
      </LoginStack>
    );

  return <NavigationContainer>{loaded ? showStack() : <LoadingPage />}</NavigationContainer>;
};

export default LoadApp;
