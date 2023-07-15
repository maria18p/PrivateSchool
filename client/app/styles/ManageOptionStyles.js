import { StyleSheet } from 'react-native';

const ManageStyles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#5352ed',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    height: 25,
    width: 100,
    marginTop: 6,
    marginLeft: 7,
  },

  btnLayout: { width: '100%', height: '12%', marginLeft: 6, marginTop: 5 },

  tableLayout: { width: '100%' },

  btnContainer: {
    backgroundColor: '#F5E663',
    borderRadius: 5,
    width: 80,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtBtn: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#fff',
    fontSize: 14,
  },

  txtOption: {
    fontSize: 20,
    color: '#ffff',
    fontWeight: '500',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    textAlign: 'center',
    textShadowColor: '#F3E0EC',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 50,
  },

  tableTxtTitleStyle: {
    fontSize: 16,
    color: '#ffff',
    textTransform: 'capitalize',
    fontWeight: '500',
    textShadowColor: '#302B27',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default ManageStyles;
