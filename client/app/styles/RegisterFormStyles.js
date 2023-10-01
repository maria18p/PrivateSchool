import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   registerFormContainer: {
      flexDirection: 'column',
      alignItems: 'stretch',
   },

   addedSubjectsContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
   },

   addedSubjectName: {
      justifyContent: 'flex-start',
      width: '67%',
      marginLeft: 20,
   },

   fontAddedSub: { fontSize: 17, color: '#fff' },

   containerDeleteBtn: {
      justifyContent: 'flex-end',
      width: '27%',
   },

   safeAreaContainer: {
      flexDirection: 'row',
      marginTop: 15,
      justifyContent: 'space-evenly',
   },

   radioBtnLayout: { flexDirection: 'row', alignItems: 'center' },

   txtRadioBtn: { fontSize: 16, fontFamily: 'Poppins-Light', letterSpacing: 1, color: '#fff' },

   teacherRegistrationAddonLayout: {
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: 'auto',
      marginBottom: 0,
   },

   txtInputTeachLayout: {
      width: '100%',
      height: 40,
      justifyContent: 'center',
   },

   txtToTeach: { fontSize: 16, alignSelf: 'center', color: '#fff' },

   txtInputStudentLayout: {
      marginTop: 10,
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: 8,
   },
});

export default styles;
