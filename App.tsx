import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { FirebaseApp } from './firebaseConfig';
import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database"
import { useEffect, useState } from 'react';
import type { Quiz, Question } from './types';
import React from 'react';

export default function App() {
  const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);

  // fetch quizzes from Firebase database
  const fetchData = () => {
    const db = getDatabase(FirebaseApp);
    const quizzesRef = ref(db, 'quizzes');
    const names = query(quizzesRef, orderByChild('name'));

    onValue(names, (snapshot) => {
      snapshot.forEach((child) => {
        const data = child.val();
        console.log(quizzes)
        console.log('data', data);
        setQuizzes([...quizzes, data as Quiz]);
      })
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    console.log(quizzes);
  }, [quizzes])

  return (
    <View style={styles.container}>
      <Text>QuizWiz</Text>
      {quizzes.length}
      {quizzes.map((prop, key)=> {
        return (
          <Text key={key}>{prop.name}</Text>
        )
      })}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
    fontWeight: 'bold'
  },
});
