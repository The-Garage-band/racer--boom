import { Box, Button} from '@mui/material';
import { EmailOutlined, PasswordOutlined, LoginOutlined, CallOutlined, Person2Outlined } from '@mui/icons-material';
import PageLayout from '../../hocs/page-layout';
import Input from '../../components/Input';

const SignInPage = () => {
  return (
    <PageLayout>
      <Box className="form">
        <h1 className="form__title">Регистрация</h1>
        <Input
          label="Имя"
          type="text"
          name="first_name"
          Icon={ Person2Outlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Фамилия"
          type="text"
          name="second_name"
          Icon={ Person2Outlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          Icon={ EmailOutlined}
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Телефон"
          type="text"
          name="phone"
          Icon={ CallOutlined}
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Логин"
          type="text"
          name="login"
          Icon={ LoginOutlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Input
          label="Пароль"
          type="password"
          name="password"
          Icon={ PasswordOutlined }
          sx={{
            marginBottom: '1rem'
          }}
        />
        <Button variant="contained" fullWidth sx={{marginBottom: '1rem'}}>Регистрация</Button>
        <Button variant="outlined" fullWidth sx={{marginBottom: '1rem'}}>Авторизация</Button>
      </Box>
    </PageLayout>
  );
};

export default SignInPage;
