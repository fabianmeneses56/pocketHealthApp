import { Dispatch, useState, SetStateAction, useEffect } from 'react'
import {
  GridColDef,
  GridToolbarContainer,
  GridRenderCellParams
} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import axios from 'axios'
import { Button } from '@mui/material'
import { toast } from 'sonner'

import { pocketApi } from '@/api'
import { IBill } from '@/interfaces/bill'
import { TopLevel } from '@/pages'

interface DataMonthState {
  summaryMonth: number
  bills: IBill[]
}

interface reqa {
  month: string
}
function deleteButton(
  params: GridRenderCellParams<any>,
  getData: () => Promise<void>
) {
  const handleDelete = async () => {
    const { status } = await pocketApi.delete<IBill>('/bills', {
      data: { id: params.id }
    })
    if (status === 201) {
      getData()
      toast.success('Gasto eliminado correctamente')
    }
  }

  return (
    <Button
      variant='contained'
      style={{
        backgroundColor: '#3F4E4F'
      }}
      onClick={handleDelete}
    >
      Delete
    </Button>
  )
}

export const columns = (getData: () => Promise<void>): GridColDef[] => {
  return [
    { field: 'category', headerName: 'CATEGORÍA', width: 250 },
    { field: 'subCategory', headerName: 'SUBCATEGORÍA', width: 250 },
    {
      field: 'date',
      headerName: 'FECHA',
      width: 250,
      renderCell: ({ value }) => {
        return <span>{dayjs(value).format('D/MMM/YY')}</span>
      }
    },
    { field: 'detail', headerName: 'DETALLE', width: 250 },
    { field: 'amount', headerName: 'IMPORTE', width: 250 },
    {
      field: '',
      headerName: '',
      width: 250,
      renderCell: param => deleteButton(param, getData)
    }
  ]
}

export function CustomToolbar(
  setShowDialog: Dispatch<SetStateAction<boolean>>
) {
  return (
    <GridToolbarContainer>
      <Button
        variant='contained'
        style={{
          backgroundColor: '#A27B5C'
        }}
        color='secondary'
        onClick={() => {
          setShowDialog(true)
        }}
      >
        añadir Gasto
      </Button>
    </GridToolbarContainer>
  )
}

export const handleDeleteCard = async (
  id: string | undefined,
  getData: () => Promise<void>
) => {
  const { status } = await pocketApi.delete<IBill>('/bills', {
    data: { id: id }
  })
  if (status === 201) {
    getData()
    toast.success('Gasto eliminado correctamente')
  }
}

export const useHandleData = (month: string) => {
  const [dataMonth, setDataMonth] = useState<DataMonthState>({
    summaryMonth: 0,
    bills: []
  })
  const [getReportState, setGetReportState] = useState<TopLevel>({
    amounts: [],
    categories: []
  })
  const body: reqa = {
    month: month
  }

  const request = async () => {
    try {
      const { data } = await pocketApi.post<IBill[]>('/bills/view', body)

      return {
        hasError: false,
        message: data
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

  const getData = async () => {
    const { message } = await request()

    setDataMonth(message)
  }

  const getReport = async () => {
    const { data } = await pocketApi.post('/bills/report', body)
    setGetReportState(data)
  }

  useEffect(() => {
    getData()
    getReport()
  }, [])

  return { dataMonth, getData, getReportState }
}
