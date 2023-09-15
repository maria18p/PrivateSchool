import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   btnLayout: {
      // borderWidth: 4,
      height: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // backgroundColor: '#161B33',
   },
   btnContainer: {
      height: 35,
      width: '31%',
      backgroundColor: '#5352ed',
      borderRadius: 10,
      marginTop: '4%',
      marginBottom: '4%',
      marginLeft: 5,
      marginRight: 5,
      justifyContent: 'center',
   },
   tblHeader: { padding: 10, marginLeft: 10 },
   cell: { fontSize: 16, textTransform: 'capitalize' },

   txtBtn: { color: '#fff', textAlign: 'center', fontSize: 18 },
});

export default styles;
