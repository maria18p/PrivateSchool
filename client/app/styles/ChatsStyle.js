import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 10,
   },

   contentContainer: {
      alignItems: 'center',
   },

   rowChatContainer: {
      borderWidth: 1,
      width: '98%',
      borderColor: '#797A9E',
      borderRadius: 5,
      padding: 9,
      marginVertical: 6,
      backgroundColor: 'transparent',
      shadowColor: '#000000',
      shadowOffset: {
         width: 1,
         height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
      borderBottomColor: '#C0D6DF',
      opacity: 0.85,
   },

   txtRowChat: {
      textTransform: 'capitalize',
      fontSize: 18,
      lineHeight: 30,
      textAlign: 'left',
      color: '#ffff',
      textShadowColor: '#5C80BC',
      textShadowOffset: { width: 1, height: 0.5 },
      textShadowRadius: 3,
      marginLeft: 10,
      fontFamily: 'Poppins-Light',
   },

   headingLayout: {
      flexDirection: 'row',
      width: '95%',
      // borderWidth: 2,
      height: 40,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
   },

   layoutSelectedChat: {
      flex: 1,
      backgroundColor: 'rgba(112, 110, 178, 0.7)',
   },

   nameContainer: {
      backgroundColor: 'transparent',
      width: '80%',
      height: '80%',
      justifyContent: 'center',
      borderLeftColor: '#fff',
      borderLeftWidth: 5,
      borderRightColor: '#fff',
      borderRightWidth: 5,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
   },

   selectedChatLayout: {
      width: '100%',
      flexDirection: 'column',
      marginTop: 10,
      height: '100%',
   },

   rowMessageContainer: {
      alignItems: 'flex-end',
      marginBottom: 3,
      borderColor: '#D972FF',
      borderBottomColor: '#8CFFDA',
      borderTopColor: 'transparent',
      width: 'auto',
      height: 'auto',
      padding: 1,
      borderWidth: 0.5,
   },

   selectedChatTxt: {
      color: '#00CEE0',
      fontWeight: '400',
      fontSize: 16,
      fontFamily: 'Poppins-Light',
   },

   dateMessage: { color: '#141B41', fontSize: 13, marginTop: 5 },

   txtStyle: {
      color: '#ffff',
      textTransform: 'capitalize',
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'Poppins-Light',
   },

   sendRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // alignSelf: 'center',
      marginHorizontal: '2%',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#ffff',
      borderRadius: 16,
      marginTop: '2%',
      marginBottom: '5%',
   },

   btnSend: { width: 25, alignItems: 'center', justifyContent: 'center' },

   txtInputContainer: {
      backgroundColor: '#B7C6E1',
      width: '92%',
      color: '#40404F',
      fontSize: 18,
      borderRadius: 15,
      marginLeft: 0,
      textAlign: 'left',
      padding: 6,
      fontFamily: 'PlayfairDisplay-VariableFont_wght',
   },
});

export default styles;
