import React, { useState, useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Toaster } from 'sonner'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Button } from '@mui/material'

import { dbCategories } from '@/database'
import DialogComponent from '@/components/ui/DialogComponent'
import { ICategory } from '@/interfaces/categories'
import { DivButton, DivContainer, Root } from '../../utils/monthStyles'
import { columns, CustomToolbar, useHandleData } from '../../utils/monthConfig'
import BillCard from '@/components/ui/BillCard'
import { pocketApi } from '@/api'

interface Props {
  month: string
  categories: ICategory[]
}

export interface reqa {
  month: string
}

const MonthView: NextPage<Props> = ({ month, categories }) => {
  const [showDialog, setShowDialog] = useState(false)

  const { dataMonth, getData } = useHandleData(month)

  const rows = dataMonth.bills?.map(res => ({
    id: res._id,
    ...res
  }))

  return (
    <DivContainer>
      <Toaster position='top-center' richColors />

      <DialogComponent
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        categories={categories}
        reloadFunction={getData}
      />
      <Typography sx={{ fontSize: 17 }} color='#d23838'>
        TOTAL EXPENSES = ${dataMonth?.summaryMonth?.toLocaleString()}
      </Typography>

      <DivButton>
        <Button
          variant='contained'
          style={{
            backgroundColor: '#A27B5C'
          }}
          onClick={() => {
            setShowDialog(true)
          }}
        >
          añadir Gasto
        </Button>

        {rows?.map(res => (
          <BillCard key={res.id} res={res} getData={getData} />
        ))}
      </DivButton>

      <Root>
        <DataGrid
          rows={rows ?? []}
          columns={columns(getData)}
          components={{
            Toolbar: () => CustomToolbar(setShowDialog)
          }}
        />
      </Root>
    </DivContainer>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query
}) => {
  const { month = '' } = query

  const categories = await dbCategories.getAllCategories()
  return {
    props: {
      month,
      categories
    }
  }
}

export default MonthView
