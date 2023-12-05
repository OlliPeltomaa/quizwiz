import { View, Text, StyleSheet, Pressable } from "react-native";
import { ResultScreenProps } from "../types";

export const Result: React.FC<ResultScreenProps> = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>You got {props.route.params.get('points')} points</Text>
            <Text style={styles.resultText}>You answered correctly to {props.route.params.get('correct')} questions</Text>
            <Pressable style={styles.button} onPress={() => props.navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Ok</Text>
            </Pressable>
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

    resultText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#5D3FD3',
        textAlign: 'center',
        width: 250,
        marginBottom: 10
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