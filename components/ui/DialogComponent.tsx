import React, { FC, Dispatch, SetStateAction } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useForm, Controller } from 'react-hook-form'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Button,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel
} from '@mui/material'
import { dbCategories } from '@/database'
import { ICategory, ISubcategory } from '@/interfaces/categories'

interface FormData {
  category: string
  subCategory: string
  subCategoriesList: ISubcategory[] | undefined
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
    control,
    formState: { errors },
    getValues,
    setValue
  } = useForm<FormData>()

  const handleSave = (data: FormData) => {
    console.log(data)
  }

  return (
    <div>
      <Dialog open={showDialog} onClose={handleClose}>
        <form onSubmit={handleSubmit(handleSave)} noValidate>
          <DialogTitle>Añadir Gasto</DialogTitle>
          <DialogContent>
            {/* <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
              variant='standard'
            /> */}
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

            <TextField
              label='fecha'
              type='password'
              variant='filled'
              fullWidth
              // {...register('password', {
              //   required: 'Este campo es requerido',
              //   minLength: { value: 6, message: 'Mínimo 6 caracteres' }
              // })}
              // error={!!errors.password}
              // helperText={errors.password?.message}
            />
            <TextField
              label='Detalle'
              type='password'
              variant='filled'
              fullWidth
              // {...register('password', {
              //   required: 'Este campo es requerido',
              //   minLength: { value: 6, message: 'Mínimo 6 caracteres' }
              // })}
              // error={!!errors.password}
              // helperText={errors.password?.message}
            />
            <TextField
              label='Importe'
              type='password'
              variant='filled'
              fullWidth
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export default DialogComponent
