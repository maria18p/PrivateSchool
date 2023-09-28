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
      const startDate = createDateWithTime(req.date, req.start);
      const endDate = createDateWithTime(req.date, req.end);
      const result = await ODM.models.Lesson.create({
         _id: new mongoose.Types.ObjectId(),
         pairing: req.pairing._id,
         date: req.date,
         room: req.room._id,
         subject: req.subject._id,
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
