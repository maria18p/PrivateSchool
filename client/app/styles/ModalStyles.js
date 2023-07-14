import { StyleSheet } from 'react-native';

const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '95%',
    backgroundColor: '#fff',
    marginTop: 35,
    alignSelf: 'center',
    opacity: 0.85,
  },

  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 350,
  },
  DATE: {
    width: 180,
    height: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#3BA99C',
    marginTop: 14,
    borderTopLeftRadius: 27,
  },

  txtDATE: {
    fontSize: 20,
    color: '#F8F4F9',
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: 10,
    // textTransform: 'uppercase',
  },

  txtModal: {
    textAlign: 'left',
    marginLeft: 12,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5,
    fontSize: 16,
    color: '#000',
  },

  txtInput: {
    backgroundColor: '#ffff',
    height: 38,
    width: '50%',
    textAlign: 'center',
  },

  startEndContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginTop: 13,
  },

  btnLayout: {
    width: '65%',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  fontTxtModal: { fontSize: 15 },

  radioBtnContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  txtInpContainer: { marginTop: 20, height: 65 },

  txtInputSubModal: {
    backgroundColor: '#FFD25A',
    fontSize: 18,
    paddingLeft: 10,
  },

  selectListContainer: { borderColor: '#030027', borderWidth: 1, borderRadius: 16 },

  editSubModalCOntainer: {
    flex: 1,
    width: '95%',
    backgroundColor: '#fff',
    marginTop: 35,
    alignSelf: 'center',
    opacity: 0.85,
  },
});
export default modalStyle;