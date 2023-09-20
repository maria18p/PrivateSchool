import { StyleSheet } from 'react-native';

const profile = StyleSheet.create({
   mainContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
   },

   nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginHorizontal: 15,
   },

   txtStyle: {
      lineHeight: 25,
      fontSize: 20,
      color: '#000000',
      fontFamily: 'PlayfairDisplay-Medium',
   },

   btnContainer: {
      height: 35,
      width: '40%',
      backgroundColor: '#5352ed',
      borderRadius: 10,
      marginTop: '4%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 10,
   },

   layoutChangePassSection: { flexDirection: 'row', justifyContent: 'space-around' },

   txtChangePassSection: { fontSize: 15, fontFamily: 'Poppins-Light' },

   txtInput: { height: '90%', fontSize: 15, color: '#1D1E2C', fontFamily: 'Poppins-Light' },

   txtBtnStyle: {
      color: '#ffff',
      textTransform: 'capitalize',
   },
});

export default profile;
