export type ISurveyModel = {
  id: string
  question: string
  answers: ISurveyAnswerModel[]
  date: Date
  didAnswer: boolean
}

export type ISurveyAnswerModel = {
  image?: string
  answer: string

}
