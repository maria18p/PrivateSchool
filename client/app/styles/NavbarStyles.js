import { StyleSheet } from 'react-native';

const navBar = StyleSheet.create({
   mainContainer: {
      flex: 0.5,
      width: '100%',
   },

   navContainer: {
      flexDirection: 'column',
      width: '40%',
      height: 'auto',
      borderTopEndRadius: 25,
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 5,
      left: 5,
      overflow: 'visible',
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
      marginLeft: 5,
      borderTopWidth: 1,
      borderTopColor: '#161925',
   },

   txtHamburgerOption: {
      color: '#fff',
      fontSize: 18,
      lineHeight: 35,
      fontFamily: 'Poppins-ExtraLight',
   },
});

export default navBar;
