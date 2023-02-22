import React, { FC, Dispatch, SetStateAction } from 'react'

import { useForm } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material'

import { ICategory, ISubcategory } from '@/interfaces/categories'
import { createBill } from '../configs/dialogComponentConfig'

interface FormData {
  category: string
  subCategory: string
  subCategoriesList: ISubcategory[] | undefined
  date: Date | null
  detail: string
  amount: string
}

interface props {
  showDialog: boolean
  setShowDialog: Dispatch<SetStateAction<boolean>>
  categories: ICategory[]
}

const DialogComponent: FC<props> = ({
  showDialog,
  setShowDialog,
  categories
}) => {
  const handleClose = () => {
    setShowDialog(!showDialog)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<FormData>()

  const handleSave = async (data: FormData) => {
    const { hasError, message } = await createBill(data)

    if (!hasError) {
      setShowDialog(false)
    }
  }

  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleSave)} noValidate>
          <DialogTitle>Añadir Gasto</DialogTitle>
          <DialogContent>
            <FormControl style={{ width: '100%' }}>
              <InputLabel id='demo-dialog-select-label'>Categoria</InputLabel>

              <Select
                value={getValues('category')}
                onChange={({ target }) => {
                  setValue('category', target.value, {
                    shouldValidate: true
                  })
                  const subcategoriesList = categories.find(
                    res => res.title === target.value
                  )?.subcategories
                  setValue('subCategoriesList', subcategoriesList, {
                    shouldValidate: true
                  })
                }}
              >
                {categories.map((category, i) => {
                  return (
                    <MenuItem key={i} value={category.title}>
                      {category.title}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl style={{ width: '100%' }}>
              <InputLabel id='demo-dialog-select-label'>
                SubCategoria
              </InputLabel>

              <Select
                value={getValues('subCategory')}
                onChange={({ target }) => {
                  setValue('subCategory', target.value, {
                    shouldValidate: true
                  })
                }}
              >
                {getValues('subCategoriesList')?.map((subCategory, i) => {
                  return (
                    <MenuItem key={i} value={subCategory.title}>
                      {subCategory.title}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Basic example'
                value={getValues('date')}
                onChange={newValue => {
                  setValue('date', newValue, {
                    shouldValidate: true
                  })
                  // console.log(newValue)
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              label='Detalle'
              variant='filled'
              fullWidth
              {...register('detail')}
              // {...register('password', {
              //   required: 'Este campo es requerido',
              //   minLength: { value: 6, message: 'Mínimo 6 caracteres' }
              // })}
              // error={!!errors.password}
              // helperText={errors.password?.message}
            />
            <TextField
              label='Importe'
              variant='filled'
              fullWidth
              {...register('amount')}
              // {...register('password', {
              //   required: 'Este campo es requerido',
              //   minLength: { value: 6, message: 'Mínimo 6 caracteres' }
              // })}
              // error={!!errors.password}
              // helperText={errors.password?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default DialogComponent
