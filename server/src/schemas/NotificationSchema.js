import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   type: { type: String, default: 'message' },
   text: { type: String, required: true },
   read: { type: Boolean, default: false },
   payload: {},
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
   hidden: { type: Boolean, default: false },
});

export const connectNotificationModal = async (ODM) => {
   await ODM.model('Notification', notificationSchema);
};
