import { Button } from '@mui/material';
import { EmailOutlined, LoginOutlined, CallOutlined, Person2Outlined } from '@mui/icons-material';

import PageLayout from '../../hocs/page-layout';
import Input from '../../components/Input';
import Avatar from '../../components/Avatar';

import validationSchema from './validation_schema';
import { useFormik } from 'formik';
// import { getUser, updateProfile, getProfile, updateAvatar, IProfile, IAvatar } from '../../API/User';

const SignUpPage = () => {

  const data = {
    first_name: 'First',
    second_name: 'Second',
    display_name: 'Display',
    login: 'Login',
    email: 'Email@123.ru',
    phone: '123123123123',
    avatar: 'https://placekitten.com/200/200',
  }

  const formik = useFormik({
    initialValues: {
      first_name: data.first_name,
      second_name: data.second_name,
      display_name: data.display_name,
      login: data.login,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
    },
    validationSchema,
    onSubmit: () => {
      console.log('submit')
      // const formData = new FormData();
      // formData.append('avatar', values.avatar);

      // console.log('submit', formData)
    },
  });

  return (
    <PageLayout>
      <form className="form" onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="form__title">Профиль</h1>
        <Avatar
          name="avatar"
          value={ formik.values.avatar }
          onChange={ formik.handleChange }
          sx={{
            marginBottom: '2rem'
          }}
        />
        <Input
          label="Имя"
          type="text"
          name="first_name"
          value={ formik.values.first_name }
          error={
            Boolean(formik.touched.first_name)
            && Boolean(formik.errors.first_name)
          }
          helperText={
            formik.touched.first_name
            && formik.errors.first_name
          }
          onChange={ formik.handleChange }
          Icon={ Person2Outlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Фамилия"
          type="text"
          name="second_name"
          value={ formik.values.second_name }
          error={
            Boolean(formik.touched.second_name)
            && Boolean(formik.errors.second_name)
          }
          helperText={
            formik.touched.second_name
            && formik.errors.second_name
          }
          onChange={ formik.handleChange }
          Icon={ Person2Outlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Отображаемое имя"
          type="text"
          name="display_name"
          value={ formik.values.display_name }
          error={
            Boolean(formik.touched.display_name)
            && Boolean(formik.errors.display_name)
          }
          helperText={
            formik.touched.display_name
            && formik.errors.display_name
          }
          onChange={ formik.handleChange }
          Icon={ Person2Outlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={ formik.values.email }
          error={
            Boolean(formik.touched.email)
            && Boolean(formik.errors.email)
          }
          helperText={
            formik.touched.email
            && formik.errors.email
          }
          onChange={ formik.handleChange }
          Icon={ EmailOutlined}
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Телефон"
          type="text"
          name="phone"
          value={ formik.values.phone }
          error={
            Boolean(formik.touched.phone)
            && Boolean(formik.errors.phone)
          }
          helperText={
            formik.touched.phone
            && formik.errors.phone
          }
          onChange={ formik.handleChange }
          Icon={ CallOutlined}
          sx={{
            marginBottom: '1rem'
          }}
        />
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
          Icon={ LoginOutlined }
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
          Сохранить
        </Button>
        <Button
          variant="outlined"
          fullWidth
          href="/game"
          sx={{marginBottom: '1rem'}}
        >
          Вернуться к игре
        </Button>
      </form>
    </PageLayout>
  );
};

export default SignUpPage;
