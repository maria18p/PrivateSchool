import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   containerStudentsScreen: { flex: 1, height: '100%' },

   btnLayout: {
      // borderWidth: 2,
      height: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   btnContainer: {
      height: 35,
      width: '30%',
      backgroundColor: '#009FFD',
      borderRadius: 10,
      marginTop: '4%',
      marginBottom: '4%',
      marginLeft: 5,
      marginRight: 5,
      justifyContent: 'center',
   },
   tblHeader: { padding: 2, marginLeft: 0 },
   cell: { fontSize: 14, textTransform: 'capitalize', width: '100%' },
   txtBtn: { color: '#ffffff', textAlign: 'center', fontSize: 20 },
});

export default styles;
