import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './src/views/HomeScreen'
import DetailScreen from './src/views/DetailScreen'

const Stack = createNativeStackNavigator()

const defaultOptions = {
  headerShown: false,
}

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={defaultOptions}
        />
        <Stack.Screen
          name='Detail'
          component={DetailScreen}
          options={defaultOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
