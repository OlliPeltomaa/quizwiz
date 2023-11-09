import { StackScreenProps } from "@react-navigation/stack"

export type Question = {
    question: string,
    options: Array<any>,
    correct: string
}
  
export type Quiz = {
    name: string,
    questions: Array<Question>
}

export type RootStackParamList = {
    Home: undefined,
    Game: Question[],
    Result: Map<string, number>
}

export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

export type GameScreenProps = StackScreenProps<RootStackParamList, 'Game'>;

export type ResultScreenProps = StackScreenProps<RootStackParamList, 'Result'>;