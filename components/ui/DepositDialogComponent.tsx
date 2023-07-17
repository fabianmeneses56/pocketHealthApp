import React, { FC, Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material'
import { NumericFormat } from 'react-number-format'
import { useForm } from 'react-hook-form'
import { IDeposit } from '@/models/Deposit'
import { pocketApi } from '@/api'
import axios from 'axios'
import { toast } from 'sonner'

export interface propsDialog {
  showDialog: boolean
  setShowDialog: Dispatch<SetStateAction<boolean>>
  // categories: ICategory[]
  // reloadFunction: () => Promise<void>
}

export const createDeposit = async (
  data: IDeposit
): Promise<{
  hasError: boolean
  message: string
}> => {
  const body: IDeposit = {
    amount: data.amount,
    detail: data.detail
  }

  try {
    const { data } = await pocketApi.post<IDeposit>('/deposits', body)

    return {
      hasError: false,
      message: 'SuccessFul'
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

const DepositDialogComponent: FC<propsDialog> = ({
  showDialog,
  setShowDialog
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset
  } = useForm<IDeposit>()

  const handleClose = () => {
    setShowDialog(!showDialog)
  }

  const handleSave = async (data: IDeposit) => {
    const { hasError } = await createDeposit(data)
    if (!hasError) {
      setShowDialog(false)
      // reloadFunction()
      // reset()
      toast.success('Deposito añadido correctamente')
    }
  }
  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleSave)} noValidate>
          <DialogTitle>Añadir Pago</DialogTitle>
          <DialogContent>
            <TextField
              label='Detalle'
              variant='standard'
              fullWidth
              style={{ margin: '10px 0' }}
              {...register('detail')}
            />

            <NumericFormat
              label='Monto'
              customInput={TextField}
              variant='standard'
              thousandSeparator={true}
              value={getValues('amount')}
              decimalScale={2}
              onValueChange={vals => {
                setValue('amount', vals.floatValue!, {
                  shouldValidate: true
                })
              }}
              style={{ width: '100%' }}
              InputProps={{
                startAdornment: <span>$</span>
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Send</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default DepositDialogComponent
