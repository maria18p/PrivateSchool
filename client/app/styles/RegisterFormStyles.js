import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   registerFormContainer: {
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
   },

   addedSubjectsContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      marginBottom: 10,
   },

   addedSubjectName: {
      justifyContent: 'center',
      alignContent: 'center',
      width: '75%',
   },

   fontAddedSub: { fontSize: 17, color: '#fff' },

   containerDeleteBtn: {
      justifyContent: 'flex-end',
      width: '25%',
      height: 'auto',
   },

   safeAreaContainer: {
      flexDirection: 'row',
      marginTop: 15,
      justifyContent: 'space-evenly',
   },

   radioBtnLayout: { flexDirection: 'row', alignItems: 'center' },

   txtRadioBtn: {
      fontSize: 15,
      fontFamily: 'Poppins-ExtraLight',
      letterSpacing: 0,
      color: '#fff',
   },

   teacherRegistrationAddonLayout: {
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
      marginBottom: 0,
   },

   optionLearnOrTeachLayout: {
      width: '100%',
      height: 45,
      justifyContent: 'center',
      marginBottom: 5,
      marginTop: 5,
   },

   txtToTeach: {
      fontSize: 15,
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'Poppins-ExtraLight',
   },

   dropdownContainer: {
      textAlign: 'left',
      color: '#000',
      fontSize: 15,
      textAlign: 'center',
      // fontFamily: 'Poppins-ExtraLight',
      marginLeft: 10,
   },
});

export default styles;
