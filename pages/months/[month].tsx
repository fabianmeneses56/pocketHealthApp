import React, { Dispatch, useState, SetStateAction } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { DataGrid, GridColDef, GridToolbarContainer } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

import { dbBills, dbCategories } from '@/database'
import { IBill } from '@/interfaces/bill'
import DialogComponent from '@/components/ui/DialogComponent'
import { ICategory } from '@/interfaces/categories'

interface Props {
  bill: IBill[]
  categories: ICategory[]
}

const columns: GridColDef[] = [
  { field: 'category', headerName: 'CATEGORÍA', width: 250 },
  { field: 'subCategory', headerName: 'SUBCATEGORÍA', width: 250 },
  { field: 'date', headerName: 'FECHA', width: 250 },
  { field: 'detail', headerName: 'DETALLE', width: 250 },
  { field: 'amount', headerName: 'IMPORTE', width: 250 }
]

function CustomToolbar(setShowDialog: Dispatch<SetStateAction<boolean>>) {
  return (
    <GridToolbarContainer>
      <Button
        variant='contained'
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
const MonthView: NextPage<Props> = ({ bill, categories }) => {
  const [showDialog, setShowDialog] = useState(false)

  const rows = bill.map(res => ({
    id: res._id,
    ...res
  }))

  return (
    <div style={{ height: 650, width: '100%', backgroundColor: '#b1b1b1' }}>
      <h1>test</h1>
      <DialogComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        categories={categories}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: () => CustomToolbar(setShowDialog)
        }}
      />
    </div>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const { month = '' } = query

  const bill = await dbBills.getBillByMonth(month.toString())

  const categories = await dbCategories.getAllCategories()
  return {
    props: {
      bill,
      categories
    }
  }
}

export default MonthView
