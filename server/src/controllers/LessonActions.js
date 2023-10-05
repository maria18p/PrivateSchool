import mongoose from 'mongoose';
import { ODM } from '../middleware/commonModule.js';

function createDateWithTime(date, timeString) {
   let [hours, minutes] = timeString.split(':');
   let [year, month, day] = date.split('-');
   day = day[0] + day[1];
   return new Date(Date.UTC(year, month - 1, day, hours, minutes, '00'));
}

export const createLesson = async (req) => {
   try {
      console.log(`[PAIRING         ID ${req.pairing._id}\n]`);
      // console.log(`[PAIRING STUDENT ID ${req.student._id}\n]`);
      // console.log(`[PAIRING SUBJECT NAME ${req.subject.name}\n`);
      console.log('==========================================');
      const startDate = createDateWithTime(req.date, req.start);
      const endDate = createDateWithTime(req.date, req.end);
      const result = await ODM.models.Lesson.create({
         _id: new mongoose.Types.ObjectId(),
         pairing: req.pairing._id,
         student: req.student._id,
         date: req.date,
         room: { _id: req.room._id, name: req.room.name },
         subject: { _id: req.subject._id, name: req.subject.name },
         start: startDate,
         finish: endDate,
      });
      result.save();
      return {
         success: true,
         message: 'Lesson Added Successfully!',
         data: result,
      };
   } catch (err) {
      console.log('ERROR CREATING LESSON');
      console.log('err', err);
      return { success: false, message: 'SOMETHING WENT WRONG' };
   }
};

export const getUserLessons = async (req) => {
   try {
      let userLessons = [];
      const lessons = await Promise.all(
         req.pairings.map(async (pairing) => {
            let pairingLessons = await ODM.models.Lesson.find({
               pairing: pairing._id,
            }).populate('room');
            if (!pairingLessons) return;
            const pairingData = await ODM.models.Pairing.findOne({
               _id: pairing._id,
            }).populate('student teacher subject');
            pairingLessons.map((lesson) => {
               lesson.pairing = pairingData;
               userLessons.push(lesson);
            });
         }),
      );

      return { success: true, data: userLessons };
   } catch (e) {
      console.log('ERROR FETCHING USERS', e);
      return { success: false, message: 'SOMETHING WENT WRONG!' };
   }
};

export const checkLessonCreationValid = async (req) => {
   let start_date = createDateWithTime(req.date, req.start);
   let end_date = createDateWithTime(req.date, req.end);

   const overlappingLessons = await ODM.models.Lesson.find({
      date: req.date,
      room: req.room._id,
      $or: [
         { start: { $lt: end_date }, finish: { $gt: start_date } },
         { start: { $gte: start_date, $lt: end_date } },
         { start: { $lte: start_date }, finish: { $gte: end_date } },
      ],
   });

   return { success: true, data: overlappingLessons.length === 0 };
};

export const userHasAnotherLesson = async (req) => {
   let start_date = createDateWithTime(req.date, req.start);
   let end_date = createDateWithTime(req.date, req.end);

   let pairings = [];
   if (req.student) pairings = await ODM.models.Pairing.find({ student: req.student._id });
   else pairings = await ODM.models.Pairing.find({ teacher: req.teacher._id });

   const overlappingLessons = await ODM.models.Lesson.find({
      pairing: { $in: pairings },
      date: req.date,
      $or: [
         { start: { $lt: end_date }, finish: { $gt: start_date } },
         { start: { $gte: start_date, $lt: end_date } },
         { start: { $lte: start_date }, finish: { $gte: end_date } },
      ],
   });

   return { success: true, data: overlappingLessons.length === 0 };
};

export const checkRoomAvailable = async (req) => {
   let start_date = createDateWithTime(req.date, req.start);
   let end_date = createDateWithTime(req.date, req.end);

   const overlappingLessons = await ODM.models.Lesson.find({
      room: req.room,
      date: req.date,
      $or: [
         { start: { $lt: end_date }, finish: { $gt: start_date } },
         { start: { $gte: start_date, $lt: end_date } },
         { start: { $lte: start_date }, finish: { $gte: end_date } },
      ],
   });

   return { success: true, data: overlappingLessons.length === 0 };
};

export const removeLesson = async (req) => {
   try {
      // Find the lesson to be removed
      const lessonToDelete = await ODM.models.Lesson.findOne({ _id: req });
      // Check if the lesson exists
      if (!lessonToDelete) {
         return {
            success: false,
            message: 'LESSON NOT FOUND.',
         };
      }
      // Delete the lesson
      const result = await ODM.models.Lesson.deleteOne({ _id: req });
      if (result.deletedCount === 1) {
         // Remove the lesson reference from the teacher's lessons (if pairing exists)
         if (lessonToDelete.pairing.length > 0) {
            const teacherPairing = await ODM.models.Pairing.findOne({
               _id: lessonToDelete.pairing,
            });
            if (teacherPairing) {
               teacherPairing.lessons = teacherPairing.lessons.filter(
                  (lesson) => lesson.toString() !== req,
               );
               await teacherPairing.save();
            }
         }
         // Remove the lesson reference from the student's lessons (if pairing exists)
         if (lessonToDelete.pairing.length > 0) {
            const studentPairing = await ODM.models.Pairing.findOne({
               _id: lessonToDelete.pairing,
            });
            if (studentPairing) {
               studentPairing.lessons = studentPairing.lessons.filter(
                  (lesson) => lesson.toString() !== req,
               );
               await studentPairing.save();
            }
         }
         // Remove the lesson reference from the room (if room exists)
         if (lessonToDelete.room.length > 0) {
            const room = await ODM.models.Room.findOne({ _id: lessonToDelete.room });
            if (room) {
               room.lessons = room.lessons.filter((lesson) => lesson.toString() !== req);
               await room.save();
            }
         }
         return {
            success: true,
            message: 'Lesson Removed Successfully!',
         };
      } else {
         return {
            success: false,
            message: 'Lesson not found or could not be removed.',
         };
      }
   } catch (err) {
      console.error('Error removing lesson:', err);
      return { success: false, message: 'SOMETHING WENT WRONG' };
   }
};
