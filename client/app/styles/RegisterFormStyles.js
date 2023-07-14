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
  },

  addedSubjectName: {
    justifyContent: 'flex-start',
    width: '75%',
  },

  fontAddedSub: { fontSize: 17 },

  containerDeleteBtn: {
    justifyContent: 'flex-end',
    width: '25%',
  },

  safeAreaContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },

  radioBtnLayout: { flexDirection: 'row', alignItems: 'center' },

  txtInput: {
    height: 35,
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
  },

  txtInputTeachLayout: {
    marginTop: 10,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 8,
  },

  teachTxtStyle: { fontSize: 15, alignSelf: 'center' },

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
