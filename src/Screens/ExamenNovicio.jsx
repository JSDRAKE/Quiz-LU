import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper'

// Importa el archivo JSON que contiene las preguntas de novicio
import NovicioReglamentacion from '../Data/novicioReglamentacion.json'

const ExamenNovicio = () => {

  const navigation = useNavigation()
  const [respuestas, setRespuestas] = useState(Array(3).fill(''))
  const [preguntas, setPreguntas] = useState([])
  const [preguntasRespondidas, setPreguntasRespondidas] = useState([]) // Array de índices de preguntas respondidas

  useEffect(() => {

    const preguntasAleatorias = obtenerPreguntasAleatorias()
    setPreguntas(preguntasAleatorias)

  }, []) // Se ejecuta solo una vez al montar el componente

  // Función para manejar la selección de respuestas
  const handleSeleccionRespuesta = (index, opcion) => {

    const nuevasRespuestas = [...respuestas]
    nuevasRespuestas[index] = opcion
    setRespuestas(nuevasRespuestas)

    // Actualizar array de índices de preguntas respondidas
    if (!preguntasRespondidas.includes(index)) {

      setPreguntasRespondidas([...preguntasRespondidas, index])

    }
  }

  // Función para obtener preguntas aleatorias
  const obtenerPreguntasAleatorias = () => {

    return NovicioReglamentacion.sort(() => Math.random() - 0.5).slice(0, 3)

  }

  const terminarExamen = () => {

    navigation.navigate('Resultado', { respuestas, preguntasRespondidas })

  }

  // Renderizar componente de pregunta
  const renderPregunta = ({ item, index }) => (

    <View style={styles.preguntaContainer}>

      <Text style={styles.preguntaText}>{item.numero_pregunta} - {item.pregunta}</Text>

      {/* Mapea las opciones de respuesta */}
      {item.opciones.map((opcion, idx) => (

        <Pressable
          key={idx}
          style={styles.opcionContainer}
          onPress={() => handleSeleccionRespuesta(index, opcion.letra)}
        >
          <RadioButton
            value={opcion.letra}
            status={respuestas[index] === opcion.letra ? 'checked' : 'unchecked'}
            onPress={() => handleSeleccionRespuesta(index, opcion.letra)}
          />
          <Text>{opcion.opcion}</Text>
        </Pressable>

      ))}

    </View>

  )

  return (

    <View style={styles.container}>

      <Text style={styles.title}>Examen de Novicio</Text>

      <FlatList
        data={preguntas}
        renderItem={renderPregunta}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.buttonContainer}>

        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>

          <Text style={styles.buttonText}>Atras</Text>

        </Pressable>

        <Pressable style={styles.button} onPress={terminarExamen}>

          <Text style={styles.buttonText}>Terminar</Text>

        </Pressable>

      </View>

    </View>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: Constants.statusBarHeight + 20,
  },
  preguntaContainer: {
    marginBottom: 10,
  },
  preguntaText: {
    marginBottom: 10,
  },
  opcionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
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
})

export default ExamenNovicio