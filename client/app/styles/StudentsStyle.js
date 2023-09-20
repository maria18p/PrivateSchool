import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   containerStudentsScreen: { flex: 1, height: '100%' },

   btnLayout: {
      // borderWidth: 2,
      height: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },

   btnContainer: {
      height: 35,
      width: '30%',
      backgroundColor: '#009FFD',
      borderRadius: 10,
      marginTop: '4%',
      marginBottom: '4%',
      marginLeft: 5,
      marginRight: 5,
      justifyContent: 'center',
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

   txtBtn: { color: '#ffffff', textAlign: 'center', fontSize: 20 },
});

export default styles;
