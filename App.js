import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ExamenNovicio from './src/components/ExamenNovicio'

// Configuración del Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Novicio" component={ExamenNovicio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Examen LU</Text>

      <View style={styles.descriptionContainer}>
      <Text style={styles.description}>
          ¡Bienvenido al mundo fascinante de la radioafición! ¿Estás listo para poner a prueba tus conocimientos y habilidades con nuestro simulador de examen diseñado específicamente para radioaficionados?.
        </Text>
        <Text style={styles.description}>
          Nuestro simulador te ofrece la oportunidad perfecta para prepararte de manera exhaustiva y efectiva antes de enfrentarte al examen oficial. Con una interfaz intuitiva y amigable, te sumergirás en un entorno de aprendizaje interactivo que simula fielmente las condiciones del examen real
        </Text>
        <Text style={styles.description}>
          Las preguntas se dividen en tres categorías: Novicio, General y Superior. Cada categoría contiene preguntas de reglamentación y técnica. Este simulador busca ayudarte a familiarizarte con el formato del examen y a evaluar tus conocimientos en cada una de las categorías.
        </Text>
        <Text style={styles.description}>
          Ya sea que vas a rendir el examen por primera vez para obtener tu licencia de radioaficionado o que estés buscando ascender a una categoría superior, nuestro simulador es la herramienta perfecta para ti.
        </Text>
      </View>

      <Text style={styles.category}>Por favor elija una Categoría</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Novicio')}
        >
          <Text style={styles.buttonText}>Novicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('General')}
        >
          <Text style={styles.buttonText}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Superior')}
        >
          <Text style={styles.buttonText}>Superior</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    marginBottom: 10,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
