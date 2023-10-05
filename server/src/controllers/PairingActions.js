import mongoose from 'mongoose';
import { ODM } from '../middleware/commonModule.js';
import { getSubjectTeachers, getSubjects } from './SubjectActions.js';
import { getUsers } from './UserActions.js';

export const getManagePairingInfo = async (req) => {
   const allPairingsData = await ODM.models.Pairing.find({
      status: 'active',
   }).populate('teacher student subject');

   const filteredData = await Promise.all(
      allPairingsData.map(async (pairing) => {
         let pairingObj = {
            _id: pairing._id,
            student: {
               _id: pairing.student._id,
               firstName: pairing.student.firstName,
               lastName: pairing.student.lastName,
            },
            status: pairing.status,
         };

         if (pairing.teacher) {
            pairingObj.teacher = {
               _id: pairing.teacher._id,
               firstName: pairing.teacher.firstName,
               lastName: pairing.teacher.lastName,
            };
            pairingObj.subject = pairing.subject;
            pairingObj.availableTeachers = await ODM.models.User.find({
               role: { $in: ['Teacher', 'Admin'] },
               subjects: { $in: [pairingObj.subject._id] },
            });
         }
         return pairingObj;
      }),
   );
   return { success: true, data: filteredData };
};

export const createPairing = async (req) => {
   try {
      const result = await ODM.models.Pairing.create({
         _id: new mongoose.Types.ObjectId(),
         student: req.user,
         subject: req.subject,
      });
      result.save();
      return result
         ? { success: true, message: 'Pairing created successfully' }
         : { success: false, message: 'Pairing not created' };
   } catch (err) {
      console.log('err', err);
      return {
         success: false,
         message: 'ERROR WHILE CREATING PAIRING',
      };
   }
};

export const updatePairing = async (req) => {
   try {
      let pairing = await ODM.models.Pairing.findOne({
         _id: req.pairing_id,
      });
      pairing.teacher = req.teacher;
      pairing.status = 'active';
      await pairing.save();
      pairing = await ODM.models.Pairing.findOne({ _id: pairing._id }).populate(
         'student teacher subject',
      );
      return {
         success: true,
         message: 'Pairing updated successfully',
         data: pairing,
      };
   } catch (err) {
      console.log('ERROR UPDATING PAIRING', err);
      return { success: false, message: 'PAIRING UPDATE ERROR' };
   }
};

export const getPairings = async (req) => {
   let filter = {};
   if (req._id) filter._id = req._id;
   if (req.role) {
      if (req.role === 'Student') filter.student = req.participant;
      else if (req.role === 'Teacher') filter.teacher = req.participant;
      else if (req.role === 'Admin') filter.teacher = req.participant;
   }
   if (req.subject) filter.subject = req.subject;
   if (req.status) filter.status = req.status;
   if (req.subject) filter.subject = req.subject;
   try {
      let result = await ODM.models.Pairing.find(filter);
      result = await Promise.all(
         result.map(async (element) => {
            let temp = {
               _id: element._id,
               student: element.student,
               teacher: element.teacher,
               subject: element.subject,
               status: element.status,
            };
            temp.subjectName = (await getSubjects({ _id: element.subject }))[0].name;
            if (temp.status === 'unassigned') {
               const teachers = await getSubjectTeachers({
                  subject_id: temp.subject,
               });
               temp.availableTeachers = teachers.json.data;
            }
            return temp;
         }),
      );
      return { success: true, data: result };
   } catch (e) {
      console.log('ERROR FETCHING USERS', e);
      return [];
   }
};

export const teacherStudents = async (req) => {
   try {
      const pairings = await ODM.models.Pairing.find({
         teacher: req.teacher._id,
         status: 'active',
      });

      const studentIds = pairings.map((pairing) => pairing.student);

      const students = await getUsers({
         _id: { $in: studentIds },
         isActive: true,
      });

      return { success: true, data: students };
   } catch (error) {
      console.error('Error fetching teacher students:', error);
      return { success: false, message: 'Error fetching teacher students' };
   }
};

export const findPairingSubjects = async (req) => {
   try {
      const result = (
         await ODM.models.Pairing.find({
            teacher: req.teacher._id,
            student: req.student._id,
         }).populate('subject')
      ).map((pairing) => pairing.subject);
      return { success: true, data: result };
   } catch (err) {
      return { success: false, message: 'Something went wrong!' };
   }
};

export const reAssignPairing = async (req) => {
   const filter = {
      _id: req.pairing._id,
   };

   const update = {
      status: 'inactive',
   };
   const result = await ODM.models.Pairing.findOneAndUpdate(filter, update);
   const newPairing = await ODM.models.Pairing.create({
      _id: new mongoose.Types.ObjectId(),
      student: req.pairing.student._id,
      teacher: req.pairing.teacher._id,
      subject: req.pairing.subject._id,
      status: 'active',
   });

   const newPairingData = await ODM.models.Pairing.findOne({
      _id: newPairing._id,
   }).populate('student teacher subject');

   return {
      success: true,
      message: 'pairing created successfully',
      data: newPairingData,
   };
};
