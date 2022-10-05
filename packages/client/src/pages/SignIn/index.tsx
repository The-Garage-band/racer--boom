import { Box, OutlinedInput, InputLabel, InputAdornment, FormControl, Link, Button} from '@mui/material';
import { EmailOutlined, LockOutlined } from '@mui/icons-material';
import PageLayout from '@/hocs/page-layout';

const SignInPage = () => {
  return (
    <PageLayout>
      <Box className="form">
        <h1 className="form__title">Вход</h1>
        <FormControl variant="outlined" fullWidth focused sx={{
          marginBottom: '1rem'
        }}>
          <InputLabel htmlFor="input-login">
            Логин
          </InputLabel>
          <OutlinedInput
            id="input-login"
            type="text"
            startAdornment={
              <InputAdornment position="start">
                <EmailOutlined color="secondary" />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth focused sx={{
          marginBottom: '1rem'
        }}>
          <InputLabel htmlFor="input-login">
            Пароль
          </InputLabel>
          <OutlinedInput
            id="input-login"
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlined color="secondary" />
              </InputAdornment>
            }
          />
        </FormControl>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: '1rem'
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
