import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
   },

   tableHeader: { backgroundColor: '#B8D5B8', marginBottom: 15 },

   tableCell: { fontSize: 13, color: '#3C6E71' },

   eachNotificationContainer: {
      width: '100%',
      padding: 8,
      borderBottomWidth: 2,
      borderColor: '#91CAF2',
      marginTop: 2,
      flexDirection: 'column',
   },

   readNotificationContainer: { backgroundColor: '#C9DCE4' },

   dataTableTxtStyle: {
      textTransform: 'capitalize',
      fontSize: 14,
      textAlign: 'justify',
   },

   nameTxt: {
      fontSize: 19,
      color: '#0E402D',
      textTransform: 'capitalize',
      marginBottom: 5,
   },

   notificationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
   },

   txtLayout: { width: '75%' },

   txt: { fontSize: 18, lineHeight: 18, color: '#003844' },

   btn: {
      padding: 5,
      width: '20%',
      height: 28,
      backgroundColor: '#2081C3',
      justifyContent: 'center',
      borderRadius: 5,
   },

   btnTxt: { textTransform: 'uppercase', textAlign: 'center', color: '#ffff', fontWeight: '500' },

   modalContainer: {
      flex: 1,
      width: '100%',
      backgroundColor: '#ffffff',
      alignSelf: 'center',
   },

   modalNameContainer: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 5,
   },

   modalTxtStyle: {
      textTransform: 'capitalize',
      fontSize: 22,
      textAlign: 'right',
      color: '#ffff',
      textShadowColor: '#272932',
      textShadowOffset: { width: 2, height: 1 },
      textShadowRadius: 5,
   },

   noMoreSubjectsContainer: { padding: 20, alignItems: 'center' },

   noMoreSubjectsText: {
      fontSize: 18,
      color: '#000000',
      fontWeight: '500',
   },
});

export default styles;
