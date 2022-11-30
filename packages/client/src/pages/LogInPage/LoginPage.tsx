import { useFormik } from 'formik'
import { Button } from '@mui/material'
import { EmailOutlined, LockOutlined } from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'

import PageLayout from '@/hocs/page-layout'
import Input from '@/components/Input'
import { login, ILogIn, OAuthGetServiceId } from '@/API/Auth'

import validationSchema from './validation_schema'

const LoginPage = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: ILogIn) =>
      login(values)
        .then(payload => {
          if (payload.status === 200) {
            navigate('/game')
          }
        })
        .catch(error => {
          const message = JSON.parse(error.request.responseText)
          console.error(message.reason)
        }),
  })

  const clickOnOAuthLogin = () => {
    const REDIRECT_URI = `${window.location.protocol}//${window.location.host}/oauth`;
    try {
      const response = OAuthGetServiceId().then(response => {
        const serviceId = response.data.service_id;
        const urlForAccept = `https://oauth.yandex.ru/authorize?client_id=${serviceId}&response_type=code&redirect_uri=${REDIRECT_URI}`;
        window.location.replace(urlForAccept);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PageLayout>
      <form className="form" onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="form__title">Авторизация</h1>
        <Input
          label="Логин"
          type="text"
          name="login"
          value={formik.values.login}
          error={Boolean(formik.touched.login) && Boolean(formik.errors.login)}
          helperText={formik.touched.login ? formik.errors.login : ''}
          onChange={formik.handleChange}
          Icon={EmailOutlined}
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
          helperText={formik.touched.password ? formik.errors.password : ''}
          onChange={formik.handleChange}
          Icon={LockOutlined}
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
          Авторизация
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to={'/home'}
          fullWidth
          sx={{ marginBottom: '1rem' }}>
          Регистрация
        </Button>
        <Button
            variant="outlined"
            fullWidth
            onClick={clickOnOAuthLogin}>Войти с Яндекс
        </Button>
      </form>
    </PageLayout>
  )
}

export default LoginPage
