import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, ImageBackground, Animated } from 'react-native';
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

  const image = {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4-KQxdWIWDFVosDliJ-HeqkLUy8_65MhJVTK2z2QMdhPF04MY_7opdD4VHco49B7AwI&usqp=CAU',
  };

  useEffect(() => {
    const imageWidth = 1000;
    const lineDuration = 50000;

    const startAnimationLoop = () => {
      const lineMoveAnimation = Animated.timing(lineAnimation, {
        toValue: imageWidth,
        duration: lineDuration,
        useNativeDriver: false,
      });
      const lineResetAnimation = Animated.timing(lineAnimation, {
        toValue: -100,
        duration: 0,
        useNativeDriver: false,
      });
      const lineLoopAnimation = Animated.sequence([lineMoveAnimation, lineResetAnimation]); // Infinite scroll effect

      const animationLoop = Animated.loop(lineLoopAnimation); // Start the infinite loop animation

      animationLoop.start();
    };

    startAnimationLoop();
    return () => {
      lineAnimation.setValue(-100);
    };
  }, []);

  const lineAnimation = new Animated.Value(-190);

  const AnimatedLineWithText = ({ width, text }) => (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Animated.View style={[{ right: width }]} />
      <Animated.View style={[{ left: width }]}>
        <Text
          style={{
            color: '#907AD6',
            fontSize: 20,
            fontWeight: '500',
            textShadowColor: '#000',
            textShadowOffset: {
              width: 0,
              height: 2,
            },
            textShadowRadius: 3,
          }}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );

  return (
    <HomeContext.Provider value={{ switchContent: switchContent }}>
      <LinearGradient colors={['#F2F4FF', '#96C5F7', '#454ADE']} style={styles.container}>
        <View style={{ height: '18%', zIndex: 5 }}>
          <ImageBackground
            source={image}
            resizeMode='cover'
            style={homeStyle.imgBackgroudContainer}>
            <ScreenHeading />
            <AnimatedLineWithText width={lineAnimation} text='LearnMe welcomes you!' />
          </ImageBackground>
        </View>
        <ScrollView style={{ height: '85%' }}>{content}</ScrollView>
      </LinearGradient>
    </HomeContext.Provider>
  );
};

export default HomeScreen;
