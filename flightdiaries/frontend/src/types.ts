export interface Diary {
  id: string,
  date: string,
  weather: string,
  visibility: string,
  comment?: string
}

export type DiaryValues = Omit<Diary, 'id'>
