import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pairingSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,

   student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },

   teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
   },

   subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
   },

   status: {
      type: String,
      default: 'unassigned',
   },

   createdAt: { type: Date, default: Date.now },

   updatedAt: { type: Date, default: Date.now },
});

export const connectPairingsModel = async (ODM) => {
   mongoose.model('Pairing', pairingSchema);
};
