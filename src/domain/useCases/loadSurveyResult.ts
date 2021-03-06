export interface ILoadSurveyResult {
  load: () => Promise<ILoadSurveyResult.Model>
}

export namespace ILoadSurveyResult {
  export type Model = {
    question: string
    date: Date
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
      isCurrentAccountAnswer: boolean
    }>
  }
}
