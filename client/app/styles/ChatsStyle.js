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
      fontSize: 20,
      lineHeight: 30,
      textAlign: 'left',
      color: '#ffff',
      textShadowColor: '#5C80BC',
      textShadowOffset: { width: 1, height: 0.5 },
      textShadowRadius: 3,
      marginLeft: 10,
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
      marginBottom: 4,
      borderColor: '#D972FF',
      borderBottomColor: '#8CFFDA',
      borderTopColor: 'transparent',
      width: 'auto',
      height: 'auto',
      padding: 1,
   },

   selectedChatTxt: { color: '#ffff', fontWeight: '400', fontSize: 22 },

   dateMessage: { color: '#141B41', fontSize: 13, marginTop: 5 },

   txtStyle: {
      color: '#ffff',
      textTransform: 'capitalize',
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 20,
   },

   sendRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 2,
      borderWidth: 1,
      borderColor: '#ffff',
      borderRadius: 16,
      marginTop: '4%',
   },

   btnSend: { width: '9%', alignItems: 'center', justifyContent: 'center' },

   txtInputContainer: {
      backgroundColor: '#B7C6E1',
      width: '92%',
      color: '#40404F',
      fontSize: 20,
      borderRadius: 15,
      marginLeft: 0,
      textAlign: 'left',
      padding: 6,
   },
});

export default styles;
