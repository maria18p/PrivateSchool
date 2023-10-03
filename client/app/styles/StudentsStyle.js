import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   containerStudentsScreen: { flex: 1, height: '100%' },

   btnLayout: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
   },

   btnContainer: {
      height: 'auto',
      width: '20%',
      backgroundColor: '#009FFD',
      borderTopLeftRadius: 25,
      borderBottomRightRadius: 25,
      borderTopRightRadius: 10,
      marginBottom: '1%',
      justifyContent: 'center',
   },

   txtBtn: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 13,
      letterSpacing: 1.5,
      fontFamily: 'PlayfairDisplay-VariableFont_wght',
   },

   tblHeader: { padding: 2, marginLeft: 0 },

   rowStyle: {
      marginBottom: 4,
      borderBottomWidth: 2,
      borderWidth: 1,
   },

   cellStyleEmail: { marginLeft: 35, marginBottom: 0 },

   status: { marginLeft: 25, marginBottom: 0 },

   cellTxt: {
      fontSize: 14,
      textTransform: 'capitalize',
      width: '100%',
      color: '#141B41',
      fontFamily: 'Raleway-SemiBoldItalic',
   },

   setInactive: { textAlign: 'right', marginTop: 9, fontFamily: 'Raleway-SemiBoldItalic' },
});

export default styles;
