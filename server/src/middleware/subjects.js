import { assignSubjectToStudent } from "../controllers/StudentActions.js";
import {
	createSubject,
	getAllSubjectsByKeys,
	getSubjects,
	removeSubject,
	updateSubject,
} from "../controllers/SubjectActions.js";
import { assignSubjectToTeacher } from "../controllers/TeacherActions.js";
import {
	getAllUserSubjectKeys,
	removeUserSubject,
} from "../controllers/UserActions.js";
import {
	requestFailure,
	requestSuccess,
	userHasAdminPermission,
	userHasStudentPermission,
	userHasTeacherPermission,
	userLoggedIn,
} from "./commonModule.js";

export const postSubjectRequest = async (req) => {
	const hasPermission = await userHasTeacherPermission(req.user);
	if (hasPermission !== true) return hasPermission;
	const queryResult = await createSubject(req.subject);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};

export const getAllSubjects = async (req) => {
	const result = await getSubjects(req.filter);
	return requestSuccess({ data: result });
};

export const deleteSubjectRequest = async (req) => {
	const hasPermission = await userHasAdminPermission(req.user);
	if (hasPermission !== true) return hasPermission;
	const queryResult = await removeSubject(req.user);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};

export const postAssignSubjectToTeacher = async (req) => {
	const hasPermission = await userHasTeacherPermission(req.user);
	if (hasPermission !== true) return hasPermission;
	const queryResult = await assignSubjectToTeacher(req);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};

export const postAssignSubjectToStudent = async (req) => {
	const hasPermission = await userHasStudentPermission(req.user);
	if (hasPermission !== true) return hasPermission;
	const queryResult = await assignSubjectToStudent(req);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};

export const getUserSubjects = async (req) => {
	const isLoggedIn = await userLoggedIn(req.user);
	if (!isLoggedIn.success) return isLoggedIn;
	const subjectKeys = await getAllUserSubjectKeys(req.user);
	const subjects = await getAllSubjectsByKeys(subjectKeys);
	return requestSuccess({ data: subjects });
};

export const postUpdateSubject = async (req) => {
	const subjectUpdated = await updateSubject(req);
	return subjectUpdated.success
		? requestSuccess({ message: subjectUpdated.message })
		: requestFailure({ message: subjectUpdated.message });
};

export const postRequestRemoveUserSubject = async (req) => {
	const queryResult = await removeUserSubject(req);
	return queryResult.success
		? requestSuccess({ message: queryResult.message })
		: requestFailure({ message: queryResult.message });
};
