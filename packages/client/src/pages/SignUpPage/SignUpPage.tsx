import { Button } from '@mui/material'
import {
  EmailOutlined,
  PasswordOutlined,
  LoginOutlined,
  CallOutlined,
  Person2Outlined,
} from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'

import PageLayout from '@/hocs/page-layout'
import Input from '@/components/Input'

import validationSchema from './validation_schema'
import { useFormik } from 'formik'
import { signup, ISignUp } from '@/API/Auth'

const SignUpPage = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values: ISignUp) =>
      signup(values)
        .then(payload => {
          console.log('payload', payload)
          if (payload.status === 200) {
            navigate('/game')
          }
        })
        .catch(error => {
          console.log('error request', error)
        }),
  })

  return (
    <PageLayout>
      <form className="form" onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="form__title">Регистрация</h1>
        <Input
          label="Имя"
          type="text"
          name="first_name"
          value={formik.values.first_name}
          error={
            Boolean(formik.touched.first_name) &&
            Boolean(formik.errors.first_name)
          }
          helperText={formik.touched.first_name && formik.errors.first_name}
          onChange={formik.handleChange}
          Icon={Person2Outlined}
          sx={{
            marginBottom: '1rem',
          }}
        />
        <Input
          label="Фамилия"
          type="text"
          name="second_name"
          value={formik.values.second_name}
          error={
            Boolean(formik.touched.second_name) &&
            Boolean(formik.errors.second_name)
          }
          helperText={formik.touched.second_name && formik.errors.second_name}
          onChange={formik.handleChange}
          Icon={Person2Outlined}
          sx={{
            marginBottom: '1rem',
          }}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
          Icon={EmailOutlined}
          sx={{
            marginBottom: '1rem',
          }}
        />
        <Input
          label="Телефон"
          type="text"
          name="phone"
          value={formik.values.phone}
          error={Boolean(formik.touched.phone) && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          onChange={formik.handleChange}
          Icon={CallOutlined}
          sx={{
            marginBottom: '1rem',
          }}
        />
        <Input
          label="Логин"
          type="text"
          name="login"
          value={formik.values.login}
          error={Boolean(formik.touched.login) && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
          onChange={formik.handleChange}
          Icon={LoginOutlined}
          sx={{
            marginBottom: '1rem',
          }}
        />
        <Input
          label="Пароль"
          type="password"
          name="password"
          value={formik.values.password}
          error={
            Boolean(formik.touched.password) && Boolean(formik.errors.password)
          }
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          Icon={PasswordOutlined}
          sx={{
            marginBottom: '1rem',
          }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting || !formik.dirty}
          fullWidth
          sx={{ marginBottom: '1rem' }}>
          Регистрация
        </Button>
        <Button
          variant="outlined"
          fullWidth
          component={Link}
          to={'/home'}
          sx={{ marginBottom: '1rem' }}>
          Авторизация
        </Button>
      </form>
    </PageLayout>
  )
}

export default SignUpPage
