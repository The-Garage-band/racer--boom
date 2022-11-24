import {Grid, Box, Button, TextField, IconButton} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import * as React from 'react';
import PageLayout from '@/hocs/page-layout';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import {useAppSelector} from '@/hooks';
import {getUserData} from '@/store/slices/GetUserSlice';
import {forumApi, ForumMessage} from '@/API/ForumApi';

import '@/pages/ForumDialogPage/ForumDialogPage.less';
import '@/styles/page.less';

const AlwaysScrollToBottom = () => {
  const elementRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => elementRef.current?.scrollIntoView());
  return <div ref={elementRef} />;
};

const ForumDialogPage: React.FC = () => {
  const emojis = [
    '😀', '😉', '😁', '😚', '😍', '😋', '🤪', '🙄', '😕',
    '😞', '😈', '💩', '👍', '👎', '🐱', '🐶'];
  const {state} = useLocation();
  const {dialogId} = state;
  const emojiRef = React.createRef<HTMLDivElement>();
  const [listMessages, setListMessages] = React.useState<ForumMessage[]>([]);
  const [dialogTitle, setDialogTitle] = React.useState('Без темы');
  const { data } = useAppSelector(getUserData)

  const handleOpenEmoji = () => emojiRef.current?.classList.toggle('show');
  const handleSendEmoji = (index:number) => {
    handleSendMessage(emojis[index]);
    handleOpenEmoji();
  }
  const getListMessages = () => {
    forumApi.getMessages(dialogId).then((response) => {
      setDialogTitle(response.name);
      setListMessages(response.messages);
    });
  };
  const handleSendMessage = (text: string) => {
    forumApi.createMessage(dialogId, text, (data.display_name || data.first_name) ).
        then(() => getListMessages());
  };
  const handleKeyPressOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode == 13) {
      const target = e.target as HTMLInputElement
      const text: string = target.value;
      handleSendMessage(text);
      target.value = '';
    }
  };
  React.useEffect(() => {
    getListMessages();
  }, []);

  return (
      <PageLayout>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className="page__content-img"
            id="forum-dialog">
          <Grid container item direction="row" justifyContent="flex-end">
            <Link to="/forum">
              <Button variant="contained">Назад</Button>
            </Link>
          </Grid>
          <Grid item sx={{flex: 1}}>
            <Box className="form form__full-size form__transparent">
              <h1 className="form__title">{dialogTitle}</h1>
              <Grid
                  container
                  className="msg-list"
                  direction="row"
                  justifyContent="flex-start"
                  alignContent="flex-start"
                  gap="30px">
                {listMessages.map((row, index) => (
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
                    {row.userName}, <span  className="msg-time">{(new Date(row.creationDate)).toLocaleString()}</span>{' '}
                  </span>
                      <span>{row.text}</span>
                    </Grid>
                ))}
                <AlwaysScrollToBottom />
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
                    sx={{width: '90%'}}
                    variant="standard"
                    onKeyPress={handleKeyPressOnInput}
                />
                <IconButton
                    color="primary"
                    sx={{alignItems: 'flex-end', ml: 'auto'}}
                    onClick={handleOpenEmoji}>
                  <AddReactionIcon fontSize="large"/>
                </IconButton>
                <div className="emoji-block" ref={emojiRef}>
                  {emojis.map((row, index) => (
                      <span
                          className="emoji-item"
                          key={index}
                          onClick={() => handleSendEmoji(index)}>
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
