import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from './src/Screens/Main'
import ExamenNovicio from './src/Screens/ExamenNovicio'
import Resultado from './src/Screens/Resultado'

// Configuración del Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Novicio" component={ExamenNovicio} options={{ headerShown: false }} />
        <Stack.Screen name="Resultado" component={Resultado} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
