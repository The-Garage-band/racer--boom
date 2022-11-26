import { Grid, Box, Button, TextField, IconButton } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import * as React from 'react'
import PageLayout from '@/hocs/page-layout'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import { FC } from 'react'

import { useTheme } from '@mui/material/styles';

import '@/pages/ForumDialogPage/ForumDialogPage.less'
import '@/styles/page.less'

type TCreateDataParams = {
  id: number
  name: string
  msg_text: string
  time: string
}
function createData(params: TCreateDataParams) {
  return { ...params }
}

const ForumDialogPage: FC = () => {
  const { state } = useLocation()
  const { dialogTitle } = state || 'Без темы'
  const emojiRef = React.createRef<HTMLDivElement>()

  const tmpDialogMsg = [
    createData({
      id: 0,
      name: 'Лена',
      msg_text: 'Первое сообщение',
      time: '01:00',
    }),
    createData({
      id: 1,
      name: 'Петя',
      msg_text: 'Второе сообщение',
      time: '02:00',
    }),
  ]
  const handleOpenEmoji = () => {
    emojiRef.current?.classList.toggle('show')
  }

  const handleSendEmoji = () => {
    handleOpenEmoji()
  }

  const emojis = [
    '😀',
    '😉',
    '😁',
    '😚',
    '😍',
    '😋',
    '🤪',
    '🙄',
    '😕',
    '😞',
    '😈',
    '💩',
    '👍',
    '👎',
    '🐱',
    '🐶',
  ]

  const theme = useTheme();

  return (
    <PageLayout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        className="page__content-img"
        id="forum-dialog" style ={{backgroundImage: `url(${theme.forumBgImage})`}}>
        <Grid container item direction="row" justifyContent="flex-end">
          <Link to="/forum">
            <Button variant="contained">Назад</Button>
          </Link>
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <Box className="form form__full-size form__transparent" style={{
            backgroundColor: theme.palette.background.opacity, 
            borderColor: theme.shape.borderColor, 
            borderWidth: theme.shape.borderWidht, 
            borderStyle: theme.shape.borderStyle, 
            boxShadow: theme.shape.boxShadow}}>
            <h1 className="form__title">{dialogTitle}</h1>
            <Grid
              container
              className="msg-list"
              direction="row"
              justifyContent="flex-start"
              alignContent="flex-start"
              gap="30px">
              {tmpDialogMsg.map((row, index) => (
                <Grid
                  container
                  item
                  direction="column"
                  justifyContent="flex-start"
                  key={index}
                  alignItems="stretch"
                  gap="5px"
                  className="msg-item">
                  <span>
                    {row.name}, <span className="msg-time">{row.time}</span>{' '}
                  </span>
                  <span>{row.msg_text}</span>
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              item
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch">
              <TextField
                autoFocus
                margin="dense"
                id="msg"
                placeholder="Начни печатать..."
                type="text"
                sx={{ width: '90%' }}
                variant="standard"
              />
              <IconButton
                color="primary"
                sx={{ alignItems: 'flex-end', ml: 'auto' }}
                onClick={handleOpenEmoji}>
                <AddReactionIcon fontSize="large" />
              </IconButton>
              <div className="emoji-block" ref={emojiRef}>
                {emojis.map((row, index) => (
                  <span
                    className="emoji-item"
                    key={index}
                    onClick={handleSendEmoji}>
                    {row}
                  </span>
                ))}
              </div>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default ForumDialogPage
