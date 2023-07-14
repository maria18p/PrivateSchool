import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const connectRoomModel = async (ODM) => {
  await ODM.model('Room', roomSchema);
};
