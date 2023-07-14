import { Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Subjects from '../Subjects/Subjects';
import Profile from '../Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import HomeContext from '../../screens/Home/HomeContext';
import Planner from '../../screens/Home/PlannerScreen/Planner';
import Manage from '../../screens/Manage/Manage';
import navBar from '../../styles/NavbarStyles';
import Students from '../../screens/Students';
import { LinearGradient } from 'expo-linear-gradient';

const teacherOptions = [{ title: 'Students', component: <Students /> }];

const adminOptions = [{ title: 'Manage', component: <Manage /> }];

const navOptions = [
  { title: 'Planner', component: <Planner /> },
  { title: 'Subjects', component: <Subjects /> },
  { title: 'Profile', component: <Profile /> },
];

export default function Navbar(props) {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [options, setOptions] = useState(navOptions);
  const context = useContext(HomeContext);

  useEffect(() => {
    addRoleOptions();
  }, []);

  const addRoleOptions = () => {
    let addedOptions = [];
    addedOptions = addedOptions.concat(navOptions);
    if (userData.role === 'Teacher') {
      addedOptions = addedOptions.concat(teacherOptions);
    } else if (userData.role === 'Admin') {
      addedOptions = addedOptions.concat(teacherOptions);
      addedOptions = addedOptions.concat(adminOptions);
    }
    setOptions(addedOptions);
  };

  const handleOnPress = (option) => {
    props.closeMenu();
    context.switchContent(option.component);
  };

  const generateOptions = () => {
    const toDisplay = {};
    if (!props.show) toDisplay.display = 'none';
    else toDisplay.zIndex = 999;
    return (
      <View style={[navBar.navContainer, toDisplay]}>
        {options.map((option, index) => {
          return (
            <LinearGradient
              key={index}
              colors={['#FDCA40', '#C5E6A6', '#ffff']}
              start={[0.9, 0.55]}
              end={[0.7, -0.4]}
              style={navBar.linearGradientContainer}>
              <TouchableOpacity style={navBar.navTab} onPress={() => handleOnPress(option)}>
                <Text style={navBar.txtHamburgerOption}>{option.title}</Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        })}
      </View>
    );
  };

  return <View style={navBar.mainContainer}>{generateOptions()}</View>;
}
