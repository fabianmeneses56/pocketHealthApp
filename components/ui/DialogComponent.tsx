import React, { FC, Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { useForm } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { NumericFormat } from 'react-number-format'

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
  reloadFunction: () => Promise<void>
}

const DialogComponent: FC<props> = ({
  showDialog,
  setShowDialog,
  categories,
  reloadFunction
}) => {
  const handleClose = () => {
    setShowDialog(!showDialog)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset
  } = useForm<FormData>()

  const handleSave = async (data: FormData) => {
    const { hasError, message } = await createBill(data)

    if (!hasError) {
      setShowDialog(false)
      reloadFunction()
      reset()
      toast.success('Gasto añadido correctamente')
    }
  }

  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleSave)} noValidate>
          <DialogTitle>Añadir Gasto</DialogTitle>
          <DialogContent>
            <FormControl
              variant='standard'
              style={{ width: '100%', margin: '10px 0' }}
            >
              <InputLabel id='demo-simple-select-standard-label'>
                Categoria
              </InputLabel>

              <Select
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
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
            <FormControl
              variant='standard'
              style={{ width: '100%', margin: '10px 0' }}
            >
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
                label='Select Date'
                value={getValues('date')}
                onChange={newValue => {
                  setValue('date', newValue, {
                    shouldValidate: true
                  })
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    style={{ width: '100%' }}
                    variant='standard'
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              label='Detalle'
              variant='standard'
              fullWidth
              style={{ margin: '10px 0' }}
              {...register('detail')}
            />

            <NumericFormat
              customInput={TextField}
              variant='standard'
              thousandSeparator={true}
              value={getValues('amount')}
              decimalScale={2}
              onValueChange={vals => {
                setValue('amount', vals.formattedValue, {
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

export default DialogComponent
