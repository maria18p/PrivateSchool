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

   headBtnLayout: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 6,
   },

   editCell: { justifyContent: 'center', marginLeft: 50 },
   btnLayout: { width: '100%', height: '12%', marginLeft: 6, marginTop: 5 },

   tableLayout: { width: '100%', marginBottom: '100%' },

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
      fontSize: 28,
      color: '#F6FFF8',
      fontWeight: '500',
      fontStyle: 'italic',
      textTransform: 'capitalize',
      textAlign: 'center',
      textShadowColor: '#100007',
      textShadowOffset: { width: 2, height: 1 },
      textShadowRadius: 35,
   },

   tblTxtTitle: {
      fontSize: 18,
      color: '#ffff',
      textTransform: 'capitalize',
      textShadowColor: '#ffffff',
      textShadowOffset: { width: 1, height: 1 },
      fontFamily: 'PlayfairDisplay-VariableFont_wght',
   },

   roomName: {
      color: '#16425B',
      textShadowColor: '#81C3D7',
      textTransform: 'uppercase',
      marginLeft: 10,
   },
});

export default ManageStyles;
