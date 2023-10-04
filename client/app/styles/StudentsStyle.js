import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   studentsContainer: { flex: 1, width: '100%', height: '100%' },

   btnLayout: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
   },

   btnContainer: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderBottomColor: '#000',
      borderBottomWidth: 0.5,
   },

   txtBtn: {
      letterSpacing: 1,
      fontFamily: 'PlayfairDisplay-VariableFont_wght',
   },

   tblHeader: { padding: 2, marginLeft: 0 },

   rowStyle: {
      marginBottom: 4,
      borderBottomWidth: 2,
   },

   cellEmail: { marginLeft: 17, marginBottom: 0 },

   status: { marginLeft: 25, marginBottom: 0, marginRight: 0 },

   cellTxt: {
      fontSize: 13,
      width: '100%',
      color: '#141B41',
      fontFamily: 'DMSerifText-Regular',
   },
});

export default styles;
