import { View, Text, TouchableOpacity, Button, Alert, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { SelectList } from 'react-native-dropdown-select-list';
import { getPairingSubjects, getTeacherStudents } from '../../../api/Pairing_requests';
import { useSelector } from 'react-redux';
import { createLesson } from '../../../api/Lesson_requests';
import modalStyle from '../../../styles/ModalStyles';
import { Calendar } from 'react-native-calendars';
import { getAllRooms } from '../../../api/Room_requests';

const eventTypes = ['Lesson', 'Practice', 'Concert'];

export default function NewEventModal(props) {
   const userData = useSelector((state) => state.user);

   const [eventType, setEventType] = useState('Lesson');
   const [date, setDate] = useState(null);
   const [start, setStart] = useState(null);
   const [end, setEnd] = useState(null);
   const [student, setStudent] = useState(null);
   const [subject, setSubject] = useState(null);
   const [room, setRoom] = useState(null);
   const [pairingSubjects, setPairingSubjects] = useState(null);
   const [calendarShown, setCalendarShown] = useState(false);
   const [students, setStudents] = useState([]);
   const [rooms, setRooms] = useState(null);

   const markedDates = {
      [date]: { selected: true, selectedColor: 'blue' },
   };

   useEffect(() => {
      if (eventType === 'Lesson') fetchStudents();
      fetchRooms();
   }, []);

   useEffect(() => {
      if (student !== null) fetchPairingSubjects();
   }, [student]);

   const fetchPairingSubjects = async () => {
      const queryResult = await getPairingSubjects({
         user: userData,
         student: student,
      });

      setPairingSubjects(queryResult.data);
   };

   const fetchStudents = async () => {
      const students = await getTeacherStudents({
         user: userData,
         role: 'Teacher',
      });

      setStudents(students.data);
   };

   const submit = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to midnight

      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      const currentTime = today.getHours() * 60 + today.getMinutes();

      const startTimeMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);

      const endTimeMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);

      if (selectedDate < today) {
         Alert.alert('Invalid lesson details: Selected date is in the past.');
      } else if (startTimeMinutes < currentTime) {
         Alert.alert('Invalid lesson details: Lesson cannot start in the past.');
      } else if (endTimeMinutes < currentTime) {
         Alert.alert('Invalid lesson details: Lesson cannot end in the past.');
      } else if (startTimeMinutes >= endTimeMinutes) {
         Alert.alert('Invalid lesson details: Start time must be before end time.');
      } else if (endTimeMinutes > 21 * 60) {
         Alert.alert('Invalid lesson details: Lesson cannot end after 21:00.');
      } else {
         const queryResult = await createLesson({
            user: userData,
            date: date,
            start: start,
            end: end,
            student: student,
            room: room,
            subject: { _id: subject._id, name: subject.name },
         });
         setStart(null);
         setEnd(null);
         Alert.alert(queryResult.message);
         console.log('[QUERY RESULT]', queryResult.message);
      }
   };

   const fetchRooms = async () => {
      setRooms((await getAllRooms()).data);
   };

   const showEventOptions = () => {
      if (eventType === 'Lesson') {
         if (students.length === 0) return <></>;

         const studentsMap = students.map((student) => {
            return {
               key: student,
               value: student.firstName + ' ' + student.lastName,
            };
         });

         return (
            <View>
               <Text style={modalStyle.txtModal}>Student:</Text>
               <SelectList
                  setSelected={(val) => {
                     setStudent(val);
                  }}
                  data={studentsMap}
               />
            </View>
         );
      }
      return <></>;
   };

   const showSubjectOptions = () => {
      if (!pairingSubjects) return <></>;
      const adaptedData = pairingSubjects.map((subject) => {
         return { key: subject, value: subject.name };
      });
      return (
         <View>
            <Text style={modalStyle.txtModal}>Subject:</Text>
            <SelectList data={adaptedData} value={subject} setSelected={(val) => setSubject(val)} />
         </View>
      );
   };

   const showRoomsSelect = () => {
      if (!rooms) return <></>;
      const adaptedData = rooms.map((room) => {
         return { key: room, value: room.name };
      });
      return <SelectList data={adaptedData} setSelected={(val) => setRoom(val)} />;
   };

   return (
      <Modal
         propagateSwipe={true}
         isVisible={true}
         animationIn='slideInUp'
         backdropColor='#6969B3'
         backdropOpacity={0.35}>
         <ScrollView>
            <View style={modalStyle.modalContainer}>
               <View>
                  <Text style={modalStyle.txtModal}>Event Type:</Text>
                  <SelectList
                     setSelected={(val) => setEventType(val)}
                     data={eventTypes}
                     defaultOption={{ key: 'Lesson', value: 'Lesson' }}
                     value={eventType}
                  />
               </View>
               <TouchableOpacity
                  onPress={() => setCalendarShown(!calendarShown)}
                  style={modalStyle.DATE}>
                  <Text style={modalStyle.txtDATE}>Date:{date}</Text>
               </TouchableOpacity>
               {calendarShown ? (
                  <Calendar
                     style={modalStyle.calendar}
                     onDayPress={(day) => {
                        setDate(day.dateString);
                     }}
                     markedDates={markedDates}
                  />
               ) : (
                  <></>
               )}
               <View style={modalStyle.startEndContainer}>
                  <Text style={modalStyle.txtModal}>Start:</Text>
                  <TextInput
                     style={[modalStyle.txtInput, { width: '50%' }]}
                     onChangeText={(text) => setStart(text)}
                     placeholder='start time'
                  />
                  <Text style={modalStyle.txtModal}>End:</Text>
                  <TextInput
                     style={[modalStyle.txtInput, { width: '50%' }]}
                     onChangeText={(text) => setEnd(text)}
                     placeholder='end time'
                  />
               </View>
               {showEventOptions()}
               {showSubjectOptions()}
               <Text style={modalStyle.txtModal}>Room:</Text>
               {showRoomsSelect()}

               <View style={modalStyle.btnLayout}>
                  <View style={{ marginTop: 50 }}>
                     <Button title='Add lesson' onPress={() => submit()} />
                  </View>
                  <View style={{ marginTop: 10 }}>
                     <Button title='Close' onPress={() => props.closeModal()} />
                  </View>
               </View>
            </View>
         </ScrollView>
      </Modal>
   );
}
