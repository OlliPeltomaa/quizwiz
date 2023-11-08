export type Question = {
    question: string,
    options: Array<string>,
    correct: string
}
  
export type Quiz = {
    name: string,
    questions: Array<Question>
}