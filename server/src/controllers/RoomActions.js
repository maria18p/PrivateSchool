import mongoose from 'mongoose';
import { ODM } from '../middleware/commonModule.js';

export const createRoom = async (req) => {
  try {
    const room = await ODM.models.Room({
      _id: new mongoose.Types.ObjectId(),
      name: req.name,
    });
    await room.save();
    console.log('Room created: ' + room + '\n');
    return { success: true, message: 'Room created successfully' };
  } catch (e) {
    console.log('ERROR CREATING ROOM ' + e.message);
    return { success: false, message: 'SOMETHING WENT WRONG !' };
  }
};

export const getRooms = async (req) => {
  let filter = {};
  if (req) {
    if (req.name !== undefined) filter.name = req.name;
  }
  try {
    const result = await ODM.models.Room.find(filter);
    return result;
  } catch (e) {
    console.log('e', e);
    return [];
  }
};

export const removeRoom = async (req) => {
  try {
    const result = await ODM.models.Room.findOneAndRemove({ _id: req._id });
    return result
      ? { success: true, message: 'Room deleted' }
      : { success: false, message: 'Room not deleted' };
  } catch (e) {
    console.log('ERROR DELETING ROOM', e);
    return { success: false, message: 'Something went wrong' };
  }
};

export const updateRoom = async (req) => {
  const filter = { _id: req._id };
  const update = { name: req.name };
  const option = { new: true };
  const result = await ODM.models.Room.findOneAndUpdate(filter, update, option);

  return { success: true, message: 'Room updated' };
};
