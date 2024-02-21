import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import preguntas from '../Data/novicioReglamentacion.json';

const Resultado = ({ route }) => {
    const navigation = useNavigation();
    const { respuestas, preguntasRespondidas } = route.params;
    const [preguntasCorrectas, setPreguntasCorrectas] = useState(-1);
    const [respuestasIncorrectas, setRespuestasIncorrectas] = useState([]);

    useEffect(() => {
        calcularPreguntasCorrectas();
    }, [respuestas]); // Se ejecuta cada vez que cambian las respuestas

    const obtenerTextoOpcion = (opciones, letraSeleccionada) => {
        const opcionSeleccionada = opciones.find(opcion => opcion.letra === letraSeleccionada);
        return opcionSeleccionada ? opcionSeleccionada.opcion : "No se encontró la respuesta";
    };

    const calcularPreguntasCorrectas = () => {
        let preguntasCorrectasCount = 0;
        let respuestasIncorrectasArray = [];

        // Filtrar las preguntas basadas en las preguntas respondidas por el usuario
        preguntasRespondidas.forEach((indicePregunta) => {
            const pregunta = preguntas[indicePregunta];
            if (pregunta.respuesta_correcta.letra !== respuestas[indicePregunta]) {
                respuestasIncorrectasArray.push({
                    pregunta: pregunta.pregunta,
                    respuestaCorrecta: pregunta.respuesta_correcta.opcion,
                    respuestaSeleccionada: respuestas[indicePregunta] || "(Sin respuesta)",
                    opciones: pregunta.opciones
                });
            } else {
                preguntasCorrectasCount++;
            }
        });

        setPreguntasCorrectas(preguntasCorrectasCount);
        setRespuestasIncorrectas(respuestasIncorrectasArray);
    };

    if (preguntasCorrectas === -1) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Calculando resultado...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultado del Examen</Text>
            <Text style={styles.resultText}>Cantidad de preguntas correctas: {preguntasCorrectas}</Text>
            {preguntasCorrectas >= 2 ? (
                <Text style={[styles.resultadoText, styles.aprobadoText]}>¡Felicitaciones! Has aprobado el examen</Text>
            ) : (
                <Text style={[styles.resultadoText, styles.reprobadoText]}>Lo siento, no has aprobado el examen</Text>
            )}

            {respuestasIncorrectas.length > 0 && (
                <View style={styles.incorrectas}>
                    <Text style={styles.title}>Respuestas incorrectas:</Text>
                    {respuestasIncorrectas.map((item, index) => (
                        <View key={index}>
                            <Text>Pregunta: {item.pregunta}</Text>
                            <Text>Tu respuesta: {obtenerTextoOpcion(item.opciones, item.respuestaSeleccionada)}</Text>
                            <Text>Respuesta correcta: {item.respuestaCorrecta} {'\n'}</Text>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Inicio</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 20,
    },
    resultadoText: {
        fontSize: 18,
    },
    aprobadoText: {
        color: 'green',
    },
    reprobadoText: {
        color: 'red',
    },
    incorrectas: {
        marginTop: 50,
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

export default Resultado;
