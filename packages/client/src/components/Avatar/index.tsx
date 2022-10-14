import { Box, Avatar as MuiAvatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface AvatarProps {
  name: string;
  sx?: StringObject;
  value?: string;
  error?: boolean;
  onChange?: any;
}

export default function Avatar({name, value, error, onChange, sx}: AvatarProps) {
  return (
    <Box sx={{ 
      ...sx,
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }}>
      <MuiAvatar
        alt="Remy Sharp"
        src={ value }
        sx={{ width: 96, height: 96 }}
      />
      <IconButton 
        color="secondary" 
        aria-label="upload avatar" 
        component="label"
        sx={{
          position: 'absolute',
          left: 'calc(100% + 15px)'
        }}
      >
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </Box>
  );
};
