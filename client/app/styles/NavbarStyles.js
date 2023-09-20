import { StyleSheet } from 'react-native';

const navBar = StyleSheet.create({
   mainContainer: {
      flex: 0.5,
      width: '100%',
   },

   navContainer: {
      flexDirection: 'column',
      marginTop: 25,
      marginLeft: 20,
      width: 180,
      height: 'auto',
      padding: 3,
      borderRadius: 6,
      backgroundColor: '#F2E94E',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'scroll',
      borderWidth: 1,
      borderColor: '#D7FDF0',
      shadowColor: '#080357',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 5,
   },

   linearGradientContainer: {
      flex: 1,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#7899D4',
      shadowColor: '#FF595E',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 10,
   },

   navTab: {
      justifyContent: 'flex-start',
      alignContent: 'center',
      marginLeft: 5,
   },

   txtHamburgerOption: {
      color: '#0B5563',
      fontSize: 18,
      lineHeight: 35,
      fontWeight: '500',
   },
});

export default navBar;
