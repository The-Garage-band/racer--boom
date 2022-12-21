import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material'
import {ChangeEvent} from "react";
import {SvgIconComponent} from "@mui/icons-material";

import { useTheme } from '@mui/material/styles';

export interface InputProps {
  label: string
  type: 'text' | 'password' | 'email' | 'tel' | 'file'
  name: string
  Icon: SvgIconComponent,
  sx?: StringObject
  value?: string
  error?: boolean
  helperText?: string
  onChange?: (event: ChangeEvent) => void,
}

export default function Input({
  label,
  type,
  name,
  value,
  error,
  helperText,
  onChange,
  Icon,
  sx,
}: InputProps) {

  const theme = useTheme();

  return (
    <FormControl variant="outlined" fullWidth sx={sx}>
      <InputLabel htmlFor="input-login" style={{backgroundColor: theme.palette.background.default}}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        inputProps={{ 'data-testid': `input-${name}` }}
        startAdornment={
          <InputAdornment position="start">
            <Icon color="secondary" />
          </InputAdornment>
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
