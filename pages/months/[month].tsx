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
import Report from '@/components/ui/report'
import DepositDialogComponent from '@/components/ui/DepositDialogComponent'

interface Props {
  month: string
  categories: ICategory[]
}

const MonthView: NextPage<Props> = ({ month, categories }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [depositDialog, setDepositDialog] = useState(false)

  const { dataMonth, getData, getReportState } = useHandleData(month)

  const rows = dataMonth.bills?.map(res => ({
    id: res._id,
    ...res
  }))

  return (
    <div>
      <DivContainer>
        <Toaster position='top-center' richColors />

        <DialogComponent
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          categories={categories}
          reloadFunction={getData}
        />
        <DepositDialogComponent
          showDialog={depositDialog}
          setShowDialog={setDepositDialog}
          // categories={categories}
          // reloadFunction={getData}
        />
        <Typography sx={{ fontSize: 17 }} color='#d23838'>
          TOTAL EXPENSES = ${dataMonth?.summaryMonth?.toLocaleString()}
        </Typography>

        <DivButton>
          {/* mobile components */}
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
          <Button
            variant='contained'
            style={{
              backgroundColor: '#A27B5C'
            }}
            onClick={() => {
              setShowDialog(true)
            }}
          >
            añadir Pago
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
              Toolbar: () => CustomToolbar(setShowDialog, setDepositDialog)
            }}
          />
        </Root>
      </DivContainer>
      <Report dataPie={getReportState} />
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

  const categories = await dbCategories.getAllCategories()
  return {
    props: {
      month,
      categories
    }
  }
}

export default MonthView
