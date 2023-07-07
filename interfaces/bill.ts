import { Dispatch, SetStateAction } from 'react'
import { ICategory, ISubcategory } from './categories'

export interface IBill {
  _id?: string
  category: string
  subCategory: string
  date: Date | null
  detail: string
  amount: string
  month: string
}
export interface cardProps {
  res: IBill
  getData: () => Promise<void>
}

export interface FormDataDialog {
  category: string
  subCategory: string
  subCategoriesList: ISubcategory[] | undefined
  date: Date | null
  detail: string
  amount: string
}

export interface propsDialog {
  showDialog: boolean
  setShowDialog: Dispatch<SetStateAction<boolean>>
  categories: ICategory[]
  reloadFunction: () => Promise<void>
}
