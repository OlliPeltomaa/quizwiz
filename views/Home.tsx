import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { HomeScreenProps, Quiz } from "../types";
import { fetchQuizzes } from "../QuizService";

export const Home: React.FC<HomeScreenProps> = (props) => {
    const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);

    useEffect(() => {
        // fetch quizzes from Firebase database
        const fetchData = async () => {
            try {
                const quizList = await fetchQuizzes();
                setQuizzes(quizList as Array<Quiz>);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <View style={styles.container}>
            {quizzes.length > 0 ? (
                <>
                    <Text style={styles.logo}>QuizWiz</Text>
                    {quizzes.map((prop, key) => (
                        <Pressable style={styles.button} key={key} onPress={() => props.navigation.navigate('Game', prop.questions)}>
                            <Text style={styles.buttonText}>{prop.name}</Text>
                        </Pressable>
                    ))}
                </>
            ) : (
                <Text style={styles.loading}>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        fontSize: 30,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#5D3FD3'
    },

    loading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5D3FD3'
    },

    button: {
        backgroundColor: '#483248',
        width: 200,
        padding: 10,
        borderRadius: 5,
        margin: 5
    },

    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    }
});