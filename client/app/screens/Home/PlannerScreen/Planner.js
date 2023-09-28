import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import styles from '../../../styles/carcassStyles';
import { useSelector } from 'react-redux';
import NewEventModal from './NewEventModal';
import { PlannerStyles } from '../../../styles/Planner_HomeScreenStyles';
import { DataTable } from 'react-native-paper';
import { getUserLessons, removeLesson } from '../../../api/Lesson_requests';
import EditLessonsModal from './EditLessonsModal';
import { Calendar } from 'react-native-calendars';
import modalStyle from '../../../styles/ModalStyles';
import ManageStyles from '../../../styles/ManageOptionStyles';

export default function Planner() {
   const colorTxt = {
      textShadowColor: '#46B1C9',
      color: '#000',
      fontWeight: '600',
   };

   const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
   ];

   const markedDates = {
      [selectedDate]: { selected: true, selectedColor: 'blue' },
   };

   const userData = useSelector((state) => state.user);

   const [selectedDate, setSelectedDate] = useState(null);
   const [selectedDateWeekDates, setSelectedDateWeekDates] = useState(null);
   const [weekPlan, setWeekPlan] = useState(null);
   const [showNewEvent, setShowNewEvent] = useState(null);
   const [selectedLesson, setSelectedLesson] = useState(null);
   const [lessons, setLessons] = useState([]);
   const [calendarShown, setCalendarShown] = useState(false);

   useEffect(() => {
      fetchLessons();
   }, []);

   useEffect(() => {
      fetchLessons();
   }, [lessons]);

   useEffect(() => {
      if (lessons || selectedDateWeekDates || lessons.length > 0) updateWeekPlan();
   }, [lessons, selectedDateWeekDates]);

   useEffect(() => {
      if (!selectedDate || selectedDate.toString() === 'Invalid Date') setSelectedDate(new Date());
      else updateCurrentWeekDates();
   }, [selectedDate]);

   const fetchLessons = async () => {
      const lessons = await getUserLessons({
         user: userData,
      });
      setLessons(lessons);
   };

   const updateWeekPlan = () => {
      if (!lessons || !selectedDateWeekDates) {
         setWeekPlan([]);
         return;
      }
      setWeekPlan(
         selectedDateWeekDates.map((weekDayObj) => {
            let dayLessons = [];
            lessons.forEach((lesson) => {
               const lessonDate = new Date(lesson.date);
               let dayEquals = lessonDate.getDay() == weekDayObj.date.getDay();
               let monthEquals = lessonDate.getMonth() == weekDayObj.date.getMonth();
               let yearEquals = lessonDate.getFullYear() == weekDayObj.date.getFullYear();
               let sameDate = ((dayEquals == monthEquals) == yearEquals) == true;

               if (sameDate) dayLessons.push(lesson);
            });
            weekDayObj.dayLessons = dayLessons;
            return weekDayObj;
         }),
      );
   };

   const updateCurrentWeekDates = () => {
      const startDate = new Date(selectedDate);

      startDate.setDate(startDate.getDate() - startDate.getDay());

      const weekDays = [];
      for (let i = 0; i < 7; i++) {
         const dayDate = new Date(startDate);
         dayDate.setDate(startDate.getDate() + i);

         const dayObject = {
            dayName: daysOfWeek[i],
            date: dayDate,
         };
         weekDays.push(dayObject);
      }

      setSelectedDateWeekDates(weekDays);
   };

   const renderWeekMenu = () => {
      if (!selectedDate) return <></>;
      if (!selectedDateWeekDates) return <></>;
      return (
         <View style={PlannerStyles.weekDaysContainer}>
            {selectedDateWeekDates.map((weekDay, index) => {
               if (weekDay.dayName === daysOfWeek[selectedDate.getDay()]) {
                  return (
                     <TouchableOpacity
                        key={`weekDay-${index}`} // Provide a unique key
                        style={[PlannerStyles.weekDayBtn, { backgroundColor: '#ffffff' }]}>
                        <Text style={[PlannerStyles.txtDay, { color: '#000', fontWeight: '500' }]}>
                           {weekDay.dayName.slice(0, 3)}
                        </Text>
                     </TouchableOpacity>
                  );
               } else {
                  return (
                     <TouchableOpacity
                        key={`weekDay-${index}`} // Provide a unique key
                        style={PlannerStyles.weekDayBtn}
                        onPress={() => {
                           setSelectedDate(weekDay.date);
                        }}>
                        <Text style={PlannerStyles.txtDay}>{weekDay.dayName.slice(0, 3)}</Text>
                     </TouchableOpacity>
                  );
               }
            })}
         </View>
      );
   };

   const handleRemoveLesson = async (lessonId) => {
      try {
         const result = await removeLesson({
            user: userData,
            lessonId: lessonId,
         });
         if (result.success) {
            Alert.alert(result.message);
            fetchLessons();
         } else {
            Alert.alert('Failed to remove lesson');
         }
      } catch (error) {
         console.error('Error removing lesson:', error);
      }
   };

   const showDayPlan = () => {
      if (!weekPlan) return <></>;
      return (
         <View>
            {weekPlan.map((dayObj, index) => {
               if (
                  !dayObj.dayLessons ||
                  new Date(dayObj.date).toLocaleDateString() !==
                     new Date(selectedDate).toLocaleDateString()
               )
                  return <View key={index}></View>;
               return (
                  <View key={index}>
                     {dayObj.dayLessons.map((lesson, index) => {
                        return (
                           <DataTable.Row key={index} onPress={() => setSelectedLesson(lesson)}>
                              <DataTable.Cell textStyle={PlannerStyles.plannerText}>
                                 {lesson.pairing.subject.name}
                              </DataTable.Cell>
                              <DataTable.Cell textStyle={PlannerStyles.plannerText}>
                                 {new Date(lesson.start).getUTCHours().toString().padStart(2, '0')}:
                                 {new Date(lesson.start)
                                    .getUTCMinutes()
                                    .toString()
                                    .padStart(2, '0')}
                                 -
                                 {new Date(lesson.finish).getUTCHours().toString().padStart(2, '0')}
                                 :
                                 {new Date(lesson.start)
                                    .getUTCMinutes()
                                    .toString()
                                    .padStart(2, '0')}
                              </DataTable.Cell>
                              <DataTable.Cell
                                 textStyle={[PlannerStyles.plannerText, { marginLeft: 30 }]}>
                                 {lesson.room.name}
                              </DataTable.Cell>
                              <DataTable.Cell
                                 textStyle={{
                                    width: '100%',
                                 }}>
                                 <Text style={PlannerStyles.plannerText}>
                                    {userData.role === 'Teacher' || userData.role === 'Admin'
                                       ? lesson.pairing.student.firstName +
                                         ' ' +
                                         lesson.pairing.student.lastName
                                       : lesson.pairing.teacher.firstName +
                                         ' ' +
                                         lesson.pairing.teacher.lastName}
                                 </Text>
                              </DataTable.Cell>
                              <DataTable.Cell textStyle={PlannerStyles.plannerText}>
                                 {userData.role === 'Student' ? ( // Check if the user is a student
                                    <></>
                                 ) : (
                                    <TouchableOpacity
                                       onPress={() => handleRemoveLesson(lesson._id)}
                                       style={{ padding: 5 }}>
                                       <Text>🗑️</Text>
                                    </TouchableOpacity>
                                 )}
                              </DataTable.Cell>
                           </DataTable.Row>
                        );
                     })}
                  </View>
               );
            })}
         </View>
      );
   };

   const createList = () => {
      return (
         <View style={PlannerStyles.titleColContainer}>
            <DataTable>
               <DataTable.Header style={{ backgroundColor: '#F5F749' }}>
                  <DataTable.Title textStyle={[ManageStyles.tblTxtTitle, colorTxt]}>
                     Event
                  </DataTable.Title>

                  <DataTable.Title textStyle={[ManageStyles.tblTxtTitle, colorTxt]}>
                     Time
                  </DataTable.Title>

                  <DataTable.Title
                     textStyle={[ManageStyles.tblTxtTitle, colorTxt, { marginLeft: 15 }]}>
                     Room
                  </DataTable.Title>

                  <DataTable.Title textStyle={[ManageStyles.tblTxtTitle, colorTxt]}>
                     {userData.role === 'Student' ? 'Teacher' : 'Student'}
                  </DataTable.Title>
               </DataTable.Header>
               {showDayPlan()}
            </DataTable>
         </View>
      );
   };

   return (
      <View style={PlannerStyles.mainLayout}>
         {renderWeekMenu()}
         {calendarShown ? (
            <Calendar
               style={modalStyle.calendar}
               onDayPress={(day) => {
                  setSelectedDate(new Date(day.dateString));
                  setCalendarShown(false);
               }}
               markedDates={markedDates}
            />
         ) : (
            <></>
         )}
         <View style={PlannerStyles.dayPlanner}>
            <View style={PlannerStyles.plannerTitleContainer}>
               {selectedDate ? (
                  <Text style={PlannerStyles.plannerTitle} onPress={() => setCalendarShown(true)}>
                     {daysOfWeek[selectedDate.getDay()]} {selectedDate.toLocaleDateString()}
                  </Text>
               ) : (
                  <></>
               )}
            </View>
            {createList()}
         </View>
         <View style={[PlannerStyles.layoutBtn, { width: '50%' }]}>
            {userData.role !== 'Student' ? (
               <View>
                  <TouchableOpacity
                     style={styles.loginButton}
                     onPress={() => setShowNewEvent(true)}>
                     {showNewEvent ? (
                        <NewEventModal closeModal={() => setShowNewEvent(!showNewEvent)} />
                     ) : (
                        <></>
                     )}
                     {/* //Edit lesson */}
                     {selectedLesson ? (
                        <EditLessonsModal
                           closeModal={() => setSelectedLesson(null)}
                           lesson={selectedLesson}
                        />
                     ) : (
                        <></>
                     )}
                     <Text style={[styles.loginButtonText, { fontSize: 15 }]}>Add event</Text>
                  </TouchableOpacity>
               </View>
            ) : (
               <></>
            )}
         </View>
      </View>
   );
}
