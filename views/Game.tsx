import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { GameScreenProps, Question } from "../types";
import { useEffect, useState } from "react";

export const Game: React.FC<GameScreenProps> = (props) => {
    const [questions, setQuestions] = useState<Array<Question>>([]);
    const [currentIndex, setIndex] = useState<number>(0);
    const [points, setPoints] = useState<number>(0);
    const [quizEnded, setQuizEnded] = useState<boolean>(false);

    // select 10 questions randomly from available questions and put the options in random order
    const createRandomQuiz = (questions: Array<Question>) => {
        const questionList = Object.values(questions);
        let shuffled = shuffleArray(questionList);
        return shuffled.slice(0, 10);
    }

    // randomize an array
    const shuffleArray = (array: Array<any>) => {
        // make a copy of the original array
        const shuffledArray = [...array];  
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            let item1 = shuffledArray[i];
            let item2 = shuffledArray[j];

            if (item1.options !== undefined) {
                // also shuffle the options
                item1.options = shuffleArray(Object.values(item1.options));
                item2.options = shuffleArray(Object.values(item2.options));
            }
            
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    const checkAnswer = (answer: string) => {
        // handle wrong answer
        if (answer !== questions[currentIndex].correct) {
            const results: Map<string, number> = new Map<string, number>();
            results.set('points', points);
            results.set('correct', currentIndex);
            setQuizEnded(true);
            props.navigation.navigate('Result', results)
            return;
        }

        // handle last question
        if (currentIndex === questions.length -1) {
            let finalPoints = points
            if (answer === questions[currentIndex].correct) {
                finalPoints +=1;
            }
            const results: Map<string, number> = new Map<string, number>();
            results.set('points', finalPoints);
            results.set('correct', currentIndex+1);
            props.navigation.navigate('Result', results)
            return;
        }

        setPoints(points+1);
        setIndex(currentIndex+1);
    }

    useEffect(() => {
        const randomQuiz = createRandomQuiz(props.route.params as Array<Question>);
        setQuestions(randomQuiz);
    }, []);
    
    return (
        <View style={styles.container}>
            {questions.length > 0 ? (
                <>
                    <Text>{currentIndex+1} / {questions.length}</Text>
                    <Text style={styles.question}>{questions[currentIndex].question}</Text>
                    {questions[currentIndex].options.map((prop, key) => (
                        <Pressable style={styles.button} key={key} onPress={() => checkAnswer(prop)}>
                            <Text style={styles.buttonText}>{prop}</Text>
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

    question: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#5D3FD3',
        textAlign: 'center',
        width: 200,
        marginBottom: 30
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