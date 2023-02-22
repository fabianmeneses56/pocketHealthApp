import dayjs from 'dayjs'
import axios from 'axios'

import { IBill } from '@/interfaces/bill'
import { pocketApi } from '@/api'
import { monthNames } from '@/utils/months'
import { ISubcategory } from '@/interfaces/categories'

interface FormData {
  category: string
  subCategory: string
  subCategoriesList: ISubcategory[] | undefined
  date: Date | null
  detail: string
  amount: string
}

export const createBill = async (
  data: FormData
): Promise<{
  hasError: boolean
  message: string
}> => {
  const dateFormat = dayjs(data.date).toDate()

  const body: IBill = {
    category: data.category,
    subCategory: data.subCategory,
    date: dateFormat,
    detail: data.detail,
    amount: data.amount,
    month: monthNames[dayjs(dateFormat).month()]
  }

  try {
    const { data } = await pocketApi.post<IBill>('/bills', body)

    return {
      hasError: false,
      message: data._id!
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error.response?.data.message
      }
    }
    return {
      hasError: true,
      message: 'Error no controlado, hable con el administrador'
    }
  }
}
