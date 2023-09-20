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
import * as Font from 'expo-font';

const LoadApp = () => {
   const [loaded, setLoaded] = useState(false);
   const userData = useSelector((state) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      async function loadFonts() {
         await Font.loadAsync({
            'CroissantOne-Regular': require('./assets/fonts/CroissantOne-Regular.ttf'),

            'Montserrat-Italic-VariableFont_wght': require('./assets/fonts/Montserrat-Italic-VariableFont_wght.ttf'),

            'Montserrat-VariableFont_wght': require('./assets/fonts/Montserrat-VariableFont_wght.ttf'),

            'PlayfairDisplay-Black': require('./assets/fonts/PlayfairDisplay-Black.ttf'),

            'PlayfairDisplay-BlackItalic': require('./assets/fonts/PlayfairDisplay-BlackItalic.ttf'),

            'PlayfairDisplay-Italic-VariableFont_wght': require('./assets/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf'),

            'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),

            'PlayfairDisplay-VariableFont_wght': require('./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),

            'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),

            'Poppins-BlackItalic': require('./assets/fonts/Poppins-BlackItalic.ttf'),

            'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),

            'Poppins-BoldItalic': require('./assets/fonts/Poppins-BoldItalic.ttf'),

            'Raleway-BlackItalic': require('./assets/fonts/Raleway-BlackItalic.ttf'),

            'Raleway-Italic-VariableFont_wght': require('./assets/fonts/Raleway-Italic-VariableFont_wght.ttf'),

            'Raleway-SemiBoldItalic': require('./assets/fonts/Raleway-SemiBoldItalic.ttf'),

            'Raleway-VariableFont_wght': require('./assets/fonts/Raleway-VariableFont_wght.ttf'),

            'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),

            'DMSerifText-Italic': require('./assets/fonts/DMSerifText-Italic.ttf'),

            'DMSerifText-Regular': require('./assets/fonts/DMSerifText-Regular.ttf'),

            'Inter-VariableFont_slnt,wght': require('./assets/fonts/Inter-VariableFont_slnt,wght.ttf'),

            'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),

            'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),

            // 'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
            // 'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
            // 'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
            // 'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
            // 'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
            // 'PlayfairDisplay-Medium': require('./assets/fonts/PlayfairDisplay-Medium.ttf'),
         });
      }
      loadFonts();
   }, []);

   useEffect(() => {
      openApp();
   }, []);

   const openApp = async () => {
      if (userData.token !== null) {
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
