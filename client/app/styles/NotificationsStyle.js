import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },

  tableHeader: { backgroundColor: '#B8D5B8', marginBottom: 15 },

  tableCell: { fontSize: 13, color: '#3C6E71' },

  eachNotificationContainer: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 4,
    borderColor: '#2AF5FF',
    marginTop: 5,
    flexDirection: 'column',
  },

  readNotificationContainer: { backgroundColor: '#D6FFB7' },

  dataTableTxtStyle: {
    textTransform: 'capitalize',
    fontSize: 14,
    textAlign: 'justify',
  },

  nameTxt: {
    fontSize: 19,
    color: '#ffff',
    textTransform: 'capitalize',
    marginBottom: 5,
  },

  txtContainer: { width: '70%', alignItems: 'flex-start' },

  txt: { fontSize: 17, lineHeight: 18, color: '#003844' },

  btnLayout: {
    marginTop: 15,
  },

  btn: {
    width: '30%',
    height: 25,
    backgroundColor: '#2081C3',
    elevation: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  btnTxt: { textTransform: 'uppercase', textAlign: 'center', color: '#ffff', fontWeight: '500' },

  modalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
  },

  modalNameContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
  },

  modalTxtStyle: {
    textTransform: 'capitalize',
    fontSize: 22,
    textAlign: 'right',
    color: '#ffff',
    textShadowColor: '#272932',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 5,
  },
});

export default styles;
