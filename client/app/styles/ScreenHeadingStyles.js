import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  threeD_EffectButton: {
    backgroundColor: '#ffff',
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2660A4',
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },

  leftSideHeadingLayout: {
    flexDirection: 'row',
    width: '42%',
    paddingLeft: 5,
    justifyContent: 'space-between',
  },

  logoutBtnLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
});

export default styles;
