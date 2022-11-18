import { useState, useEffect, ChangeEvent } from 'react'
import { URL_API, PATH_GET_AVATAR } from '@/constants';

import { Box, Avatar as MuiAvatar, IconButton } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

interface AvatarProps {
  name: string
  sx?: StringObject
  value?: string
  onChange: (file: File) => void,
}

export default function Avatar({ name, value, onChange, sx }: AvatarProps) {
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource | null>()
  const [preview, setPreview] = useState<string | undefined>()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
      if (file) {
          setSelectedFile(file);
          onChange(file);
      }
  };

  const avatarImage = `${URL_API}${PATH_GET_AVATAR}${value}`;

  return (
    <Box
      sx={{
        ...sx,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
      <MuiAvatar
        alt="Remy Sharp"
        src={preview ?? avatarImage}
        sx={{ width: 96, height: 96 }}
      />
      <IconButton
        color="secondary"
        aria-label="upload avatar"
        component="label"
        sx={{
          position: 'absolute',
          left: 'calc(100% + 15px)',
        }}>
        <input
          hidden
          accept="image/*"
          type="file"
          name={name}
          onChange={inputHandler}
        />
        <PhotoCamera />
      </IconButton>
    </Box>
  )
}
