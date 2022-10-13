import {
  Grid,
  Box,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import * as React from 'react';
import PageLayout from '../../hocs/page-layout';
import AddReactionIcon from '@mui/icons-material/AddReaction';

import './ForumDialogPage.less';
import '../../styles/page.less';

function createData(
    id: number, name: string, msg_text = '', time: string) {
  return {id, name, msg_text, time};
}

const ForumDialogPage = () => {
  const {state} = useLocation();
  const {dialogTitle} = state;
  const emojiRef = React.createRef<HTMLDivElement>();

  const tmpDialogMsg = [
    createData(0, 'Лена', 'Первое сообщение', '01:00'),
    createData(0, 'Лена', 'Второе сообщение', '02:00'),
    createData(0, 'Петя', 'Третье сообщение!', '03:00'),
    createData(0, 'Ася', 'Четвертое сообщение', '04:00'),

  ];
  const handleOpenEmoji = () => {
    emojiRef.current?.classList.toggle('show');
  };

  const handleSendEmoji = () => {
    handleOpenEmoji();
  };

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
    '🐶'];

  return (
      <PageLayout>
        <Grid container direction="column" justifyContent="center"
              alignItems="stretch" className="page__content-img"
              id="forum-dialog">
          <Grid container item direction="row" justifyContent="flex-end">
            <Link to="/forum"><Button variant="contained">Назад</Button></Link>
          </Grid>
          <Grid item sx={{flex: 1}}>
            <Box className="form form__full-size form__transparent">
              <h1 className="form__title">{dialogTitle}</h1>
              <Grid container className="msg-list" direction="row"
                    justifyContent="flex-start"
                    alignContent="flex-start" gap="30px">
                {tmpDialogMsg.map((row) => (
                    <Grid container item direction="column"
                          justifyContent="flex-start"
                          alignItems="stretch" gap="5px" className="msg-item">
                      <span>{row.name}, <span
                          className="msg-time">{row.time}</span> </span>
                      <span>{row.msg_text}</span>
                    </Grid>
                ))}
              </Grid>
              <Grid container item direction="row" justifyContent="flex-start"
                    alignItems="stretch">
                <TextField
                    autoFocus
                    margin="dense"
                    id="msg"
                    placeholder="Начни печатать..."
                    type="text"
                    sx={{width: '90%'}}
                    variant="standard"
                />
                <IconButton color="primary"
                            sx={{alignItems: 'flex-end', ml: 'auto'}}
                            onClick={handleOpenEmoji}>
                  <AddReactionIcon fontSize="large"/>
                </IconButton>
                <div className="emoji-block" ref={emojiRef}>
                  {emojis.map((row) => (
                      <span className="emoji-item" onClick={handleSendEmoji}>
                 {row}
                 </span>
                  ))}
                </div>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </PageLayout>
  );
};

export default ForumDialogPage;
