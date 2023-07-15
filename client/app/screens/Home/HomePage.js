//

import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, Animated, Text } from 'react-native';
import Planner from './PlannerScreen/Planner';
import { LinearGradient } from 'expo-linear-gradient';
import HomeContext from './HomeContext';
import ScreenHeading from '../../components/ScreenHeading/ScreenHeading';
import styles from '../../styles/carcassStyles';
import homeStyle from '../../styles/HomePageStyle';

const HomeScreen = ({ navigation }) => {
  const [content, setContent] = useState(<Planner />);

  const switchContent = (newContent) => {
    if (newContent === undefined) return;
    setContent(newContent);
  };

  useEffect(() => {
    const imageWidth = 1000; // The width of the image
    const lineDuration = 15000; // Duration in milliseconds for line animation

    Animated.timing(lineAnimation, {
      toValue: imageWidth,
      duration: lineDuration,
      useNativeDriver: false,
    }).start();
  }, []);

  const image = {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4-KQxdWIWDFVosDliJ-HeqkLUy8_65MhJVTK2z2QMdhPF04MY_7opdD4VHco49B7AwI&usqp=CAU',
  };

  const AnimatedLineWithText = ({ width, text }) => (
    <View style={{}}>
      <Animated.View
        style={[
          {
            right: width,
          },
        ]}
      />
      <Animated.View
        style={[
          {
            left: width, // Set the left position of the text container to match the animated line width
          },
        ]}>
        <Text style={{}}>{text}</Text>
      </Animated.View>
    </View>
  );

  const lineAnimation = new Animated.Value(-100);

  return (
    <HomeContext.Provider value={{ switchContent: switchContent }}>
      <LinearGradient colors={['#F2F4FF', '#96C5F7', '#454ADE']} style={styles.container}>
        <View style={{ height: '18%', zIndex: 5 }}>
          <ImageBackground
            source={image}
            resizeMode='cover'
            style={homeStyle.imgBackgroudContainer}>
            <ScreenHeading />
            <AnimatedLineWithText width={lineAnimation} text='Welcome to your account' />
          </ImageBackground>
        </View>
        <ScrollView style={{ height: '85%' }}>{content}</ScrollView>
      </LinearGradient>
    </HomeContext.Provider>
  );
};

export default HomeScreen;
