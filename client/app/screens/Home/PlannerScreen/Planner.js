import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import styles from '../../../styles/carcassStyles';
import { useSelector } from 'react-redux';
import NewEventModal from './NewEventModal';
import { PlannerStyles } from '../../../styles/Planner_HomeScreenStyles';
import { DataTable } from 'react-native-paper';
import { getUserLessons, removeLesson } from '../../../api/Lesson_requests';
import { Calendar } from 'react-native-calendars';
import modalStyle from '../../../styles/ModalStyles';
import ManageStyles from '../../../styles/ManageOptionStyles';
import { Icon } from 'react-native-elements';

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
   const [calendarShown, setCalendarShown] = useState(false);
   const [isWeekCollapsed, setIsWeekCollapsed] = useState(false);
   const [lessons, setLessons] = useState([]);

   useEffect(() => {
      fetchLessons();
   }, []);

   useEffect(() => {
      fetchLessons();
   }, [showNewEvent]);

   useEffect(() => {
      if (lessons || selectedDateWeekDates || lessons.length > 0) updateWeekPlan();
   }, [lessons, selectedDateWeekDates]);

   useEffect(() => {
      if (!selectedDate || selectedDate.toString() === 'Invalid Date') setSelectedDate(new Date());
      else updateCurrentWeekDates();
   }, [selectedDate]);

   const fetchLessons = async () => {
      const lessonsData = await getUserLessons({
         user: userData,
      });
      setLessons(lessonsData);
   };

   const handleRemoveLesson = async (lessonId) => {
      try {
         const result = await removeLesson({
            user: userData,
            lessonId: lessonId,
         });
         if (result.success) {
            Alert.alert(result.message);
            await fetchLessons();
         } else {
            Alert.alert('Failed to remove lesson');
         }
      } catch (error) {
         console.error('Error removing lesson:', error);
      }
   };

   const updateWeekPlan = () => {
      if (!selectedDateWeekDates || !lessons) {
         setWeekPlan([]);
         return;
      }
      setWeekPlan(
         selectedDateWeekDates.map((weekDayObj) => {
            let dayLessons = lessons.filter((lesson) => {
               const lessonDate = new Date(lesson.date);
               return (
                  lessonDate.getDay() === weekDayObj.date.getDay() &&
                  lessonDate.getMonth() === weekDayObj.date.getMonth() &&
                  lessonDate.getFullYear() === weekDayObj.date.getFullYear()
               );
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
      if (!selectedDate || !selectedDateWeekDates) return <></>;
      return (
         <View style={PlannerStyles.weekContainer}>
            <View style={PlannerStyles.daysContainer}>
               {selectedDateWeekDates.map((weekDay, index) => {
                  const isSameDay = weekDay.dayName === daysOfWeek[selectedDate.getDay()];
                  return (
                     <TouchableOpacity
                        key={`weekDay-${index}`}
                        style={[
                           PlannerStyles.weekDayBtn,
                           isSameDay
                              ? PlannerStyles.selectedWeekDayBtn
                              : isWeekCollapsed
                              ? { display: 'none' }
                              : {},
                        ]}
                        onPress={() => {
                           if (isSameDay) {
                              setIsWeekCollapsed(!isWeekCollapsed);
                           } else {
                              setSelectedDate(weekDay.date);
                              setIsWeekCollapsed(true);
                           }
                        }}>
                        <Text style={[PlannerStyles.txtDay, isSameDay ? { color: '#000' } : {}]}>
                           {weekDay.dayName.slice(0, 3)}
                        </Text>
                     </TouchableOpacity>
                  );
               })}
            </View>
            <View style={PlannerStyles.selectedDateContainer}>
               <View style={PlannerStyles.selectedDateLayout}>
                  {selectedDate ? (
                     <Text
                        style={PlannerStyles.plannerTitle}
                        onPress={() => {
                           setIsWeekCollapsed(!isWeekCollapsed);
                           setCalendarShown(true);
                        }}>
                        {daysOfWeek[selectedDate.getDay()]} {selectedDate.toLocaleDateString()}
                     </Text>
                  ) : (
                     <></>
                  )}
               </View>
            </View>
         </View>
      );
   };

   const tableTitles = () => {
      return (
         <View style={PlannerStyles.titleTableLayout}>
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

                  {userData.role !== 'Student' ? (
                     <DataTable.Title numeric textStyle={[ManageStyles.tblTxtTitle, colorTxt]}>
                        Edit
                     </DataTable.Title>
                  ) : null}
               </DataTable.Header>
               {showDayPlan()}
            </DataTable>
         </View>
      );
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
                        const isStudent = userData.role === 'Student';
                        return (
                           <DataTable.Row key={index} onPress={() => setSelectedLesson(lesson)}>
                              <DataTable.Cell textStyle={PlannerStyles.plannerText}>
                                 {lesson.pairing.subject.name}
                              </DataTable.Cell>
                              <DataTable.Cell
                                 style={PlannerStyles.rowBtn}
                                 textStyle={PlannerStyles.plannerText}>
                                 {new Date(lesson.start).getUTCHours().toString().padStart(2, '0')}:
                                 {new Date(lesson.start)
                                    .getUTCMinutes()
                                    .toString()
                                    .padStart(2, '0')}
                                 -
                                 {new Date(lesson.finish).getUTCHours().toString().padStart(2, '0')}
                                 :
                                 {new Date(lesson.finish)
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
                                 }}
                                 style={PlannerStyles.plannerText}>
                                 {isStudent
                                    ? `${lesson.pairing.teacher.firstName} ${lesson.pairing.teacher.lastName}`
                                    : `${lesson.pairing.student.firstName} ${lesson.pairing.student.lastName}`}
                              </DataTable.Cell>
                              {!isStudent && (
                                 <DataTable.Cell
                                    numeric
                                    onPress={() => handleRemoveLesson(lesson._id)}>
                                    <View style={{ alignContent: 'center' }}>
                                       <Icon
                                          name='delete'
                                          type='ionicons'
                                          color='#3A445D'
                                          style={{ alignSelf: 'center' }}
                                          size={20}
                                       />
                                    </View>
                                 </DataTable.Cell>
                              )}
                           </DataTable.Row>
                        );
                     })}
                  </View>
               );
            })}
         </View>
      );
   };

   return (
      <View style={PlannerStyles.plannerContainer}>
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
         <View style={PlannerStyles.dayPlanner}>{tableTitles()}</View>
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
