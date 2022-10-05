import { OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material';

interface InputProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'tel';
  name: string;
  icon: JSX.Element,
  sx?: StringObject
}

export default function Input({label, type, name, icon, sx}: InputProps) {
  return (
    <FormControl variant="outlined" fullWidth sx={sx}>
      <InputLabel htmlFor="input-login">
        { label }
      </InputLabel>
      <OutlinedInput
        id={ `inpit-${name}` }
        type={ type }
        name={ name }
        startAdornment={
          <InputAdornment position="start">
            { icon }
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
