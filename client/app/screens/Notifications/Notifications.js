import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	getNotifications,
	markNotificationsRead,
} from "../../api/Notification_requests";
import NotificationActionModal from "./NotificationActionModal";
import notificationStyles from "../../styles/NotificationsStyle";
import { setUserNotifications } from "../../store/reducer";

const Notifications = () => {
	const [notifications, setNotifications] = useState(null);
	const [actionData, setActionData] = useState(null);

	const userData = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchNotifications();
	}, []);

	useEffect(() => {
		if (notifications) makeNotificationsRead();
	}, [notifications]);

	const fetchNotifications = async () => {
		setNotifications((await getNotifications({ user: userData })).data);
	};

	const makeNotificationsRead = async () => {
		await markNotificationsRead({ notifications: notifications });
		const updatedNotification = (await getNotifications({ user: userData }))
			.data;
		dispatch(setUserNotifications({ notifications: updatedNotification }));
	};

	const showNotifications = () => {
		if (!notifications) return <></>;
		return (
			<>
				{notifications.map((notification, key) => {
					return (
						<View
							style={[
								[
									notificationStyles.eachNotificationContainer,
									{ backgroundColor: "#FFC15E" },
								],
								notification.read &&
									notificationStyles.readNotificationContainer,
							]}
							key={key}
						>
							{determineNotificationType(notification)}
						</View>
					);
				})}
			</>
		);
	};

	const determineNotificationType = (notification) => {
		if (notification.type === "message")
			return (
				<Text style={notificationStyles.nameTxt}>{notification.text}</Text>
			);
		else if (notification.type === "pair")
			return pairingRequestNotification(notification);
	};

	const pairingRequestNotification = (notification) => {
		return (
			<>
				<Text
					style={[
						notificationStyles.nameTxt,
						notification.read && [
							notificationStyles.nameTxt,
							{ color: "#2E5EAA" },
						],
					]}
				>
					{notification.payload.firstName + " " + notification.payload.lastName}
				</Text>
				<View style={notificationStyles.txtContainer}>
					<Text
						style={[
							[notificationStyles.txt, { color: "#ffff" }],
							notification.read && [
								notificationStyles.txt,
								{ fontWeight: "600" },
							],
						]}
					>
						{notification.text}
					</Text>
				</View>
				<View style={notificationStyles.btnLayout}>
					<TouchableOpacity
						style={notificationStyles.btn}
						onPress={() =>
							setActionData({
								type: notification.type,
								data: notification.payload,
							})
						}
					>
						<Text style={notificationStyles.btnTxt}>Show</Text>
					</TouchableOpacity>
				</View>
			</>
		);
	};

	return (
		<ScrollView style={notificationStyles.container}>
			{showNotifications()}
			{actionData ? (
				<NotificationActionModal
					type={actionData.type}
					data={actionData.data}
					closeModal={() => setActionData(null)}
				/>
			) : (
				<></>
			)}
		</ScrollView>
	);
};

export default Notifications;
