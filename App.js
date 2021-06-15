import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet} from 'react-native';
import {HomeStack} from './src/navigations/Navigation'
export default function App() {
  return (
    <NavigationContainer>
      <HomeStack/>
    </NavigationContainer>
  )
}