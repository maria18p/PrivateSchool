import { StyleSheet } from 'react-native';

const navBar = StyleSheet.create({
   mainContainer: {
      flex: 0.5,
      width: '100%',
   },

   navContainer: {
      flexDirection: 'column',
      width: '50%',
      height: 'auto',
      padding: 0,
      // borderRadius: 6,
      borderTopEndRadius: 25,
      backgroundColor: '#EDEBFF',
      position: 'absolute',
      top: 15,
      left: 10,
      overflow: 'scroll',
      borderWidth: 0,
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
      marginLeft: 20,
      marginBottom: 5,
      borderTopWidth: 2,
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
