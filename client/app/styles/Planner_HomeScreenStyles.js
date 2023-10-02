import { StyleSheet } from 'react-native';

export const PlannerStyles = StyleSheet.create({
   plannerContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
   },

   dayPlanner: {
      width: '100%',
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },

   plannerTitle: {
      fontSize: 16,
      color: '#ffff',
      textAlign: 'center',
      fontWeight: '300',
   },

   titleStyle: { fontSize: 18, color: '#ffff' },

   plannerText: {
      fontSize: 14,
      textAlign: 'left',
      textDecorationLine: 'underline',
      textTransform: 'capitalize',
      color: '#000',
      fontWeight: '300',
   },

   rowBtn: {
      justifyContent: 'center',
      alignItems: 'center',
   },

   weekContainer: {
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      height: 'auto',
   },

   daysContainer: { flexDirection: 'column', width: '22%', padding: 5, marginTop: 5 },

   selectedDateContainer: {
      width: '78%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
   },

   selectedDateLayout: {
      width: '60%',
      height: 40,
      justifyContent: 'center',
      backgroundColor: '#315BC4',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 25,
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
   },

   weekDayBtn: {
      backgroundColor: '#315BC4',
      flexDirection: 'column',
      width: '100%',
      shadowOpacity: 0.8,
      elevation: 30,
      shadowRadius: 10,
      alignItems: 'center',
      padding: 3,
   },

   selectedWeekDayBtn: {
      backgroundColor: '#ffffff',
      borderWidth: 2,
      borderColor: '#315BC4',
      borderRadius: 5,
   },

   titleTableLayout: {
      width: '100%',
      height: 'auto',
   },

   popover: { textAlign: 'center', fontSize: 14 },

   txtDay: { fontSize: 18, color: '#ffff' },

   layoutBtn: { marginTop: 25, alignSelf: 'flex-end' },
});
