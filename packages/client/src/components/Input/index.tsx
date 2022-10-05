import { OutlinedInput, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface InputProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'tel';
  name: string;
  Icon?: SvgIconComponent,
  sx?: StringObject
}

export default function Input({label, type, name, Icon, sx}: InputProps) {
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
            <Icon color="secondary" />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
