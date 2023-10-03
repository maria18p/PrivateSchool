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
      lineHeight: 22,
      fontSize: 14,
      color: '#000000',
      fontFamily: 'Poppins-Light',
   },

   txtBtn: { fontSize: 13, color: '#ffff' },

   btnContainer: {
      height: 30,
      width: '35%',
      backgroundColor: '#5352ed',
      borderRadius: 10,
      marginTop: '2%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginBottom: 10,
   },

   btnLayout: { marginTop: '5%', padding: 10 },

   layoutChangePassSection: { flexDirection: 'row', justifyContent: 'space-around' },

   txtChangePassSection: { fontSize: 14, fontFamily: 'Poppins-Light' },

   txtInput: { height: '90%', fontSize: 14, color: '#1D1E2C', fontFamily: 'Poppins-Light' },

   txtBtnStyle: {
      color: '#ffff',
      textTransform: 'capitalize',
   },
});

export default profile;
