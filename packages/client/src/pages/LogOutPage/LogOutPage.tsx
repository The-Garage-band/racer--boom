import React from 'react'
import { Button } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';

import PageLayout from '@/hocs/page-layout'

import { useFormik } from 'formik'
import { logout } from '@/API/Auth'
import { getUserData } from '@/store/slices/GetUserSlice'
import { useAppSelector } from '@/hooks'

const LogOutPage = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useAppSelector(getUserData)
  if (!data.id && !isLoading) {
    navigate('/log_in')
  }

  const formik = useFormik({
    initialValues: [],
    onSubmit: () =>
      logout()
        .then(payload => {
          if (payload.status === 200) {
            navigate('/log_in')
          }
        })
        .catch(error => {
          const message = JSON.parse(error.request.responseText)
          console.error(message.reason)
        }),
  })

  const theme = useTheme();

  return (
    <PageLayout>
      <form className="form" onSubmit={formik.handleSubmit} autoComplete="off" 
        style={{
          backgroundColor: theme.palette.background.opacity, 
          borderColor: theme.shape.borderColor, 
          borderWidth: theme.shape.borderWidht, 
          borderStyle: theme.shape.borderStyle, 
          boxShadow: theme.shape.boxShadow
        }}>
        <h1 className="form__title">Вы уверены, что хотите выйти?</h1>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ marginBottom: '1rem' }}>
          Да, уверен
        </Button>
        <Button
          component={Link}
          to="/home"
          fullWidth
          className="button">
          Вернуться в игру
        </Button>
      </form>
    </PageLayout>
  )
}

export default LogOutPage
