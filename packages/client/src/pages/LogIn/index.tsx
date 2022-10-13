import { Button} from '@mui/material';
import { EmailOutlined, LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import PageLayout from '../../hocs/page-layout';
import Input from '../../components/Input';

import validationSchema from './validation_schema';
import { useFormik } from 'formik';
import { login, ILogIn } from '../../API/AuthApi';

const SignInPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values: ILogIn) => login(values)
      .then((payload) => {
        console.log('payload', payload)
        if (payload.status === 200) {
            navigate('/game');
        }
      })
      .catch((error) => {
        const message = JSON.parse(error.request.responseText)
        console.error(message.reason);
      })
    });

  return (
    <PageLayout>
      <form className="form" onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="form__title">Авторизация</h1>
        <Input
          label="Логин"
          type="text"
          name="login"
          value={ formik.values.login }
          error={
            Boolean(formik.touched.login)
            && Boolean(formik.errors.login)
          }
          helperText={
            formik.touched.login
            && formik.errors.login
          }
          onChange={ formik.handleChange }
          Icon={ EmailOutlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Пароль"
          type="password"
          name="password"
          value={ formik.values.password }
          error={
            Boolean(formik.touched.password)
            && Boolean(formik.errors.password)
          }
          helperText={
            formik.touched.password
            && formik.errors.password
          }
          onChange={ formik.handleChange }
          Icon={ LockOutlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={
            formik.isSubmitting || !formik.dirty
          }
          fullWidth
          sx={{marginBottom: '1rem'}}
        >
          Авторизация
        </Button>
        <Button
          variant="outlined"
          href="/sign_up"
          fullWidth
          sx={{marginBottom: '1rem'}}
        >
          Регистрация
        </Button>
      </form>
    </PageLayout>
  );
};

export default SignInPage;
