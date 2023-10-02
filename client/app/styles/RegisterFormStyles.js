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
      marginBottom: 5,
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

   dropdownBtn: {
      backgroundColor: '#3B3843',
      borderRadius: 5,
      marginBottom: 3,
      paddingHorizontal: 10,
      paddingVertical: 4,
      shadowColor: '#746D75',
      shadowOffset: {
         width: 0,
         height: 3,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
   },
});

export default styles;
