import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    width: '92%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  threeD_EffectButton: {
    backgroundColor: '#ffff',
    borderRadius: 50,
    width: 33,
    height: 33,
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
    justifyContent: 'space-between',
    // borderWidth: 5,
  },

  logoutBtnLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
  },
});

export default styles;
