import React, { useState } from 'react';
import { ScrollView, View, ImageBackground } from 'react-native';
import Planner from './PlannerScreen/Planner';
import { LinearGradient } from 'expo-linear-gradient';
import HomeContext from './HomeContext';
import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import styles from '../../styles/carcassStyles';
import homeStyle from '../../styles/HomePageStyle';
import img1 from '../../assets/homepage2.jpg';

const HomeScreen = ({ navigation }) => {
   const [content, setContent] = useState(<Planner />);

   const switchContent = (newContent) => {
      if (newContent === undefined) return;
      setContent(newContent);
   };

   return (
      <HomeContext.Provider value={{ switchContent: switchContent }}>
         <LinearGradient colors={['#F2F4FF', '#96C5F7', '#454ADE']} style={styles.container}>
            <View style={{ height: '18%', zIndex: 5 }}>
               <ImageBackground
                  source={img1}
                  resizeMode='cover'
                  style={homeStyle.imgBackgroudContainer}>
                  <ScreenHeading />
               </ImageBackground>
            </View>
            <ScrollView style={{ height: '85%' }}>{content}</ScrollView>
         </LinearGradient>
      </HomeContext.Provider>
   );
};

export default HomeScreen;
