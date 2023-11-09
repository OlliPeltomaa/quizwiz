import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { Quiz } from "./types";
import { FirebaseApp } from "./firebaseConfig";

// makes connection to the db and fetches quizzes
export const fetchQuizzes = async () => {
    return new Promise((resolve) => {
        const db = getDatabase(FirebaseApp);
        const quizzesRef = ref(db, 'quizzes');
        const names = query(quizzesRef, orderByChild('name'));
        const quizzes: Array<Quiz> = [];

        onValue(names, (snapshot) => {
            snapshot.forEach((child) => {
                const data = child.val();
                quizzes.push(data as Quiz);
            });

            // Resolve the promise with the fetched quizzes
            resolve(quizzes);
        });
    })
}