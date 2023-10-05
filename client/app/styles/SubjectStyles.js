import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   generateSubjectsContainer: {
      flex: 1,
      width: '80%',
      marginTop: 25,
      justifyContent: 'center',
      flexDirection: 'column',
      alignSelf: 'center',
   },
   subListLayout: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: 'transparent',
      borderWidth: 2,
      borderBottomColor: '#96C5F7',
      borderBottomRightRadius: 14,
      paddingLeft: 10,
      height: 45,
      marginTop: 10,
      backgroundColor: '#3A86FF',
      opacity: 0.75,
      shadowOpacity: 0.6,
   },

   txtSubName: { fontSize: 22, color: '#ffff' },

   btnLearnNewSubject: {
      marginTop: '100%',
      width: '50%',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3A86FF',
   },

   txtNewSub: { fontSize: 16, color: '#ffff', textAlign: 'center' },

   showSubModalContainer: { flex: 1, width: '100%' },

   subLayout: {
      width: '90%',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
   },

   txtMySubjects: {
      fontSize: 22,
      color: '#40476D',
      textTransform: 'capitalize',
      fontFamily: 'Poppins-MediumItalic',
      textShadowColor: '#826754',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      letterSpacing: 1,
      lineHeight: 25,
      textDecorationLine: 'underline',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
   },

   roleNewSubjectActionLayout: {
      width: '65%',
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 10,
   },
});

export default styles;
