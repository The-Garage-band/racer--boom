import { Box, Link, Button} from '@mui/material';
import { EmailOutlined, LockOutlined } from '@mui/icons-material';
import PageLayout from '../../hocs/page-layout';
import Input from '../../components/Input';

const SignInPage = () => {
  return (
    <PageLayout>
      <Box className="form">
        <h1 className="form__title">Авторизация</h1>
        <Input
          label="Логин"
          type="text"
          name="login"
          icon={
            <EmailOutlined color="secondary" />
          }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Пароль"
          type="password"
          name="password"
          icon={
            <LockOutlined color="secondary" />
          }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: '3rem'
        }}>
          <Link href="#" color="secondary">Забыли пароль?</Link>
        </Box>
        <Button variant="contained" fullWidth sx={{marginBottom: '1rem'}}>Авторизация</Button>
        <Button variant="text" fullWidth sx={{marginBottom: '1rem'}}>Нет аккаунта?</Button>
        <Button variant="outlined" fullWidth sx={{marginBottom: '1rem'}}>Регистрация</Button>
      </Box>
    </PageLayout>
  );
};

export default SignInPage;
