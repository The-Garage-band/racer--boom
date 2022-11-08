import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material'

interface InputProps {
  label: string
  type: 'text' | 'password' | 'email' | 'tel' | 'file'
  name: string
  Icon?: any // надо поправить
  sx?: StringObject
  value?: string
  error?: boolean
  helperText?: any // надо поправить
  onChange?: any // надо поправить
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
  return (
    <FormControl variant="outlined" fullWidth sx={sx}>
      <InputLabel htmlFor="input-login">{label}</InputLabel>
      <OutlinedInput
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
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
