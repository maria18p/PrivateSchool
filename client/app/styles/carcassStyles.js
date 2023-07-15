import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  welcomeAnimationContainer: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerOptionLoginScreen: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },

  titleText: { fontSize: 20, fontWeight: 'bold', color: '#0D21A1' },

  bottomView: {
    width: '88%',
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: '#ffffff ',
  },

  inputView: {
    height: 50,
    backgroundColor: '#f1f3f6',
    marginTop: '3.5%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputIcon: {
    paddingHorizontal: '2%',
  },

  input: {
    height: '90%',
    flex: 1,
    fontSize: 18,
    color: '#1D1E2C',
  },

  loginButton: {
    height: 35,
    width: '75%',
    backgroundColor: '#5352ed',
    borderRadius: 10,
    marginTop: '4%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },

  loginWithBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '8%',
  },

  iconButton: {
    backgroundColor: '#ADB6C4',
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 100,
  },

  registerText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 17,
  },

  safeAreaViewHomePage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginTop: 2,
  },

  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  linearStyles: {
    justifyContent: 'center',
    flex: 0.4,
    marginTop: 10,
    padding: 4,
  },

  txtHelloUser: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#3A435E',
    textAlign: 'center',
  },
});

export default styles;
