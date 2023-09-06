import { SafeAreaView, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles/carcassStyles';
import loadPageStyle from '../../styles/LoadingPageStyle';

export default function LoadingPage() {
   return (
      <LinearGradient colors={['#F2F4FF', '#96C5F7', '#454ADE']} style={styles.container}>
         <SafeAreaView style={loadPageStyle.imgBackgroudContainer}>
            <LottieView
               source={require('../../assets/jsonAnimations/loadedAppAnimation.json')}
               autoPlay
               loop={true}
               resizeMode='cover'
            />
         </SafeAreaView>
      </LinearGradient>
   );
}
