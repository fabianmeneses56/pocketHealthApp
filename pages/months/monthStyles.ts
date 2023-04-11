import { styled } from '@mui/material/styles'

export const Root = styled('div')(({ theme }) => ({
  height: 600,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

export const DivButton = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

export const DivContainer = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: '#2c3639',
  marginTop: 15,
  [theme.breakpoints.up('sm')]: {
    backgroundColor: '#DCD7C9'
  }
}))
