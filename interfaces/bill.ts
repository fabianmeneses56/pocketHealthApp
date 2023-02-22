export interface IBill {
  _id?: string
  category: string
  subCategory: string
  date: Date | null
  detail: string
  amount: string
  month: string
}
