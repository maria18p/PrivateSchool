import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   token: String,
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   notifications: {
      type: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification',
            required: false,
         },
      ],
      default: [],
   },
   email: { type: String, required: true, unique: true }, // email must have a unique
   password: String,
   storedPassword: String,
   isActive: { type: Boolean, default: true },
   role: String,
   subjects: {
      type: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: false,
         },
      ],
      default: [],
   },
   lessons: {
      type: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lesson',
            required: false,
         },
      ],
      default: [],
   },
   phoneNumber: { type: String, default: '' },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
});

export const connectUsersModel = async (ODM) => {
   mongoose.model('User', userSchema);
};
