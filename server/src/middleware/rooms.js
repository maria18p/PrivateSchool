import {
	createRoom,
	getRooms,
	removeRoom,
	updateRoom,
} from "../controllers/RoomActions.js";
import {
	requestFailure,
	requestSuccess,
	userHasAdminPermission,
} from "./commonModule.js";

export const postRoomRequest = async (req) => {
	const queryResult = await createRoom(req);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};

export const postRequestUpdateRoom = async (req) => {
	const queryResult = await updateRoom(req);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};

export const getAllRoomsRequest = async (req) => {
	const result = await getRooms(req.filter);
	return requestSuccess({ data: result });
};

export const deleteRoomRequest = async (req) => {
	const queryResult = await removeRoom(req);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};
