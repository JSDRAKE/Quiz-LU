import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

// Importa los archivos JSON que contienen las preguntas de novicio
import NovicioReglamentacion from '../Data/novicioReglamentacion.json';
import NovicioTecnica from '../Data/novicioTecnica.json';

const ExamenNovicio = () => {
  const navigation = useNavigation();
  const [respuestas, setRespuestas] = useState(Array(6).fill('')); // 3 preguntas de reglamentación + 3 preguntas de técnica
  const [preguntas, setPreguntas] = useState([]);
  const [preguntasRespondidas, setPreguntasRespondidas] = useState([]); // Array de índices de preguntas respondidas

  useEffect(() => {
    const preguntasAleatoriasReglamentacion = obtenerPreguntasAleatorias(NovicioReglamentacion, 3);
    const preguntasAleatoriasTecnica = obtenerPreguntasAleatorias(NovicioTecnica, 3);

    const preguntasInterleaved = intercalarPreguntas(preguntasAleatoriasReglamentacion, preguntasAleatoriasTecnica);
    setPreguntas(preguntasInterleaved);
  }, []);

  const obtenerPreguntasAleatorias = (preguntas, cantidad) => {
    return preguntas.sort(() => Math.random() - 0.5).slice(0, cantidad);
  };

  const intercalarPreguntas = (preguntasReglamentacion, preguntasTecnica) => {
    const preguntasInterleaved = [];

    preguntasInterleaved.push({ type: 'section', title: 'Reglamentación' });
    preguntasReglamentacion.forEach(pregunta => {
      preguntasInterleaved.push(pregunta);
    });

    preguntasInterleaved.push({ type: 'section', title: 'Técnica' });
    preguntasTecnica.forEach(pregunta => {
      preguntasInterleaved.push(pregunta);
    });

    return preguntasInterleaved;
  };

  const handleSeleccionRespuesta = (index, opcion) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = opcion;
    setRespuestas(nuevasRespuestas);

    if (!preguntasRespondidas.includes(index)) {
      setPreguntasRespondidas([...preguntasRespondidas, index]);
    }
  };

  const terminarExamen = () => {
    navigation.navigate('Resultado', { respuestas, preguntasRespondidas });
  };

  const renderPregunta = ({ item, index }) => {
    if (item.type === 'section') {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.preguntaContainer}>
          <Text style={styles.preguntaText}>{item.numero_pregunta} - {item.pregunta}</Text>
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
      );
    }
  };

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
  );
};

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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
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
});

export default ExamenNovicio;
