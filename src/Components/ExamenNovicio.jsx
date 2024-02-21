import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const ExamenNovicio = () => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examen de Novicio</Text>

      <Text style={styles.sectionTitle}>Reglamentación</Text>
      {/* Aquí podrías mostrar las opciones de respuesta para la reglamentación */}

      <Text style={styles.sectionTitle}>Técnica</Text>
      {/* Aquí podrías mostrar las opciones de respuesta para la técnica */}

      <View style={styles.buttonContainer}>
        <Button title="Atrás" onPress={() => {/* Manejar la navegación hacia atrás */}} />
        <Button title="Terminar" onPress={() => {/* Manejar la lógica para terminar el examen */}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ExamenNovicio;
