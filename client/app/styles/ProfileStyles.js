import { StyleSheet } from 'react-native';

const profile = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nameContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  txtStyle: { lineHeight: 25, fontSize: 20, color: '#000000' },
  btnContainer: {
    height: 35,
    width: '40%',
    backgroundColor: '#5352ed',
    borderRadius: 10,
    marginTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  txtBtnStyle: { color: '#ffff', textTransform: 'capitalize' },
});

export default profile;
