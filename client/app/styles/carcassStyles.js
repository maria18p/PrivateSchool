import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      width: '100%',
      height: '100%',
   },

   welcomeAnimationContainer: {
      height: '19%',
      justifyContent: 'center',
      marginBottom: 15,
      marginTop: '13%',
   },

   registerOptionLoginScreen: {
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      width: '100%',
      height: 50,
      marginTop: 10,
   },

   bottomView: {
      width: '88%',
      padding: 10,
      alignSelf: 'center',
      flexDirection: 'column',
      backgroundColor: '#ffffff ',
   },

   inputView: {
      flexDirection: 'row',
      height: 40,
      backgroundColor: '#f1f3f6',
      marginTop: '5%',
      marginBottom: '2%',
      display: 'flex',
      alignItems: 'center',
   },

   btnSendResetPassword: {
      backgroundColor: '#5352ed',
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,
   },

   inputIcon: {
      paddingHorizontal: '2%',
   },

   input: {
      height: '90%',
      flex: 1,
      fontSize: 18,
      color: '#1D1E2C',
   },

   loginButton: {
      height: 35,
      width: '75%',
      backgroundColor: '#5352ed',
      borderRadius: 10,
      marginTop: '5%',
      marginBottom: 10,
      justifyContent: 'center',
      alignSelf: 'center',
   },

   loginButtonText: {
      color: '#fff',
      alignSelf: 'center',
      fontSize: 18,
   },

   loginWithBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '8%',
   },

   iconButton: {
      backgroundColor: '#ADB6C4',
      padding: 14,
      marginHorizontal: 10,
      borderRadius: 100,
   },

   registerText: {
      textAlign: 'center',
      fontSize: 17,
      color: '#fff',
   },

   btnForgotPassword: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 12,
   },

   safeAreaViewHomePage: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      marginTop: 2,
   },

   topBar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
   },

   linearStyles: {
      justifyContent: 'center',
      flex: 0.4,
      marginTop: 10,
      padding: 4,
   },

   txtHelloUser: {
      fontSize: 18,
      paddingLeft: 10,
      color: '#2A2D34',
      textAlign: 'center',
      fontFamily: 'CroissantOne-Regular',
   },
});

export default styles;
