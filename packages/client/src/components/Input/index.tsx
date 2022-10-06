import { OutlinedInput, InputLabel, InputAdornment, FormControl, FormHelperText } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface InputProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'tel';
  name: string;
  Icon?: SvgIconComponent;
  sx?: StringObject;
  value?: string;
  error?: boolean;
  helperText?: any;
  onChange?: any;
}

export default function Input({label, type, name, value, error, helperText, onChange, Icon, sx}: InputProps) {
  return (
    <FormControl
      variant="outlined"
      fullWidth
      sx={sx}
    >
      <InputLabel htmlFor="input-login">
        { label }
      </InputLabel>
      <OutlinedInput
        id={ name }
        type={ type }
        name={ name }
        value={ value }
        onChange={ onChange }
        error={ error }
        startAdornment={
          <InputAdornment position="start">
            <Icon color="secondary" />
          </InputAdornment>
        }
      />
      <FormHelperText>
        { helperText }
      </FormHelperText>
    </FormControl>
  );
};
