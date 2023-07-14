import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	checkPassword,
	updateFirstName,
	updateLastName,
	updatePassword,
} from "../../api/User_requests";
import profile from "../../styles/ProfileStyles";
import { Ionicons } from "@expo/vector-icons";
import { updateUserName } from "../../store/reducer";

export default function Profile() {
	const userData = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [showChangePassword, setShowChangePassword] = useState(null);
	const [oldPassword, setOldPassword] = useState(null);
	const [showNewPassword, setShowNewPassword] = useState(null);
	const [newParameterValue, setNewParameterValue] = useState(null);
	const [passwordVisible, setPasswordVisible] = useState(false); // State variable for password visibility
	const [changeParameter, setChangeParameter] = useState(null);

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const sendOldPassword = async () => {
		if (!oldPassword) {
			Alert.alert("Please enter the old password");
			return;
		}
		const res = await checkPassword({ user: userData, password: oldPassword });
		if (res.success) {
			setShowChangePassword(null);
			setShowNewPassword(true);
		} else {
			Alert.alert(res.message);
		}
	};

	const changePasswordSection = () => {
		if (!showChangePassword) return <></>;
		return (
			<View>
				<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
					<Text style={{ fontSize: 15 }}>Enter old password:</Text>
					<TextInput
						style={{ height: "90%", fontSize: 15, color: "#1D1E2C" }}
						placeholder="enter password"
						keyboardType="default"
						secureTextEntry={
							changeParameter === "password"
								? !passwordVisible
								: passwordVisible
						}
						onChangeText={(text) => setOldPassword(text)}
					/>
					{changeParameter === "password" && (
						<TouchableOpacity onPress={togglePasswordVisibility}>
							<Ionicons
								name={passwordVisible ? "eye" : "eye-off"}
								size={24}
								color="#888888"
							/>
						</TouchableOpacity>
					)}
				</View>
				<TouchableOpacity
					style={profile.btnContainer}
					onPress={sendOldPassword}
				>
					<Text style={profile.txtBtnStyle}>send</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const newPasswordSection = () => {
		if (!showNewPassword) return <></>;
		let placeholder = "Enter new password";
		if (changeParameter === "firstName") placeholder = "Enter new first name";
		if (changeParameter === "lastName") placeholder = "Enter new last name";
		return (
			<View>
				<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
					<Text style={[profile.txtStyle, { fontSize: 15 }]}>
						{placeholder}:
					</Text>
					<TextInput
						style={{ height: "90%", fontSize: 15, color: "#1D1E2C" }}
						placeholder={placeholder}
						keyboardType="default"
						secureTextEntry={
							changeParameter === "password"
								? !passwordVisible
								: passwordVisible
						}
						onChangeText={(text) => setNewParameterValue(text)}
					/>
					{changeParameter === "password" && (
						<TouchableOpacity onPress={togglePasswordVisibility}>
							<Ionicons
								name={passwordVisible ? "eye" : "eye-off"}
								size={24}
								color="#888888"
							/>
						</TouchableOpacity>
					)}
				</View>
				<TouchableOpacity style={profile.btnContainer} onPress={submit}>
					<Text style={profile.txtBtnStyle}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const submit = async () => {
		let res = null;
		let func = null;
		let params = {
			user: userData,
			parameter: newParameterValue,
		};
		if (changeParameter === "password") func = updatePassword;
		else if (changeParameter === "firstName") func = updateFirstName;
		else if (changeParameter === "lastName") func = updateLastName;

		res = await func(params);

		if (res.success) {
			if (changeParameter !== "password") dispatch(updateUserName(res.data));
			setShowChangePassword(null);
			setShowNewPassword(null);
		}
		if (res.message) Alert.alert(res.message);
	};

	return (
		<View style={profile.mainContainer}>
			<View style={profile.nameContainer}>
				<Text style={[profile.txtStyle, { fontSize: 15 }]}>Email:</Text>
				<Text style={profile.txtStyle}>{userData.email}</Text>
			</View>
			<View style={profile.nameContainer}>
				<Text style={[profile.txtStyle, { fontSize: 15 }]}>First name:</Text>
				<Text style={profile.txtStyle}>{userData.firstName}</Text>
			</View>
			<View style={profile.nameContainer}>
				<Text style={[profile.txtStyle, { fontSize: 15 }]}>Last name:</Text>
				<Text style={profile.txtStyle}>{userData.lastName}</Text>
			</View>

			<TouchableOpacity
				style={profile.btnContainer}
				onPress={() => {
					setChangeParameter("firstName");
					setShowChangePassword(!showChangePassword);
				}}
			>
				<Text style={{ fontSize: 15, color: "#ffff" }}>Change First Name</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={profile.btnContainer}
				onPress={() => {
					setChangeParameter("lastName");
					setShowChangePassword(!showChangePassword);
				}}
			>
				<Text style={{ fontSize: 15, color: "#ffff" }}>Change Last Name</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={profile.btnContainer}
				onPress={() => {
					setChangeParameter("password");
					setShowChangePassword(!showChangePassword);
				}}
			>
				<Text style={{ fontSize: 15, color: "#ffff" }}>Change Password</Text>
			</TouchableOpacity>
			{changePasswordSection()}
			{newPasswordSection()}
		</View>
	);
}
