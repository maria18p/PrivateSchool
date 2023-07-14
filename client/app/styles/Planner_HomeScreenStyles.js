import { StyleSheet } from 'react-native';

export const PlannerStyles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 2,
  },

  dayPlanner: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  plannerTitle: {
    fontSize: 18,
    color: '#ffff',
    textAlign: 'center',
    fontWeight: '300',
    // textShadowColor: '#C5D86D',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 0.8,
  },

  titleStyle: { fontSize: 18, color: '#ffff' },

  plannerText: {
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textTransform: 'capitalize',
  },

  plannerTitleContainer: {
    width: '55%',
    height: 50,
    backgroundColor: '#1098F7',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    marginTop: 7,
    marginBottom: 7,
  },

  titleColContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },

  weekDaysContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },

  weekDayBtn: {
    backgroundColor: '#00CFC1',
    width: '14%',
    borderTopWidth: 4,
    borderBottomColor: '#024e51',
    borderBottomWidth: 10,
    borderColor: '#AC92A6',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOpacity: 0.8,
    elevation: 30,
    shadowRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtDay: { fontSize: 17, color: '#ffff' },

  layoutBtn: { marginTop: 25, alignSelf: 'flex-end' },
});