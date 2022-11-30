import {Grid, Box, Button, TextField, IconButton} from '@mui/material';
import {DialogContent, DialogContentText, DialogActions} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import * as React from 'react';
import PageLayout from '@/hocs/page-layout';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import {useAppSelector} from '@/hooks';
import {getUserData} from '@/store/slices/GetUserSlice';
import {forumApi, ForumMessage} from '@/API/ForumApi';
import {useTheme} from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {ModalComponent} from '@/components/ModalComponent';

import '@/pages/ForumDialogPage/ForumDialogPage.less';
import '@/styles/page.less';

const AlwaysScrollToBottom = () => {
  const elementRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => elementRef.current?.scrollIntoView());
  return <div ref={elementRef}/>;
};

interface TModalThemeDelete {
  handleClose: () => void,
  idForDelete: number
}

const ContentModalThemeDelete: React.FC<TModalThemeDelete> = (props: TModalThemeDelete) => {
  const {handleClose, idForDelete} = props;

  const handleOk = () => {
    forumApi.deleteMessage(idForDelete).then(() => {
      handleClose();
    });
  };

  return (
      <div>
        <DialogContent>
          <DialogContentText>
            <i>Вы уверены что хотите удалить это сообщение?</i>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleOk}>Да</Button>
          <Button type="submit" onClick={handleClose}>Нет</Button>
        </DialogActions>
      </div>
  );
};

const ForumDialogPage: React.FC = () => {
  const emojis = [
    '😀', '😉', '😁', '😚', '😍', '😋', '🤪', '🙄', '😕',
    '😞', '😈', '💩', '👍', '👎', '🐱', '🐶'];
  const {state} = useLocation();
  const {dialogId} = state;
  const emojiRef = React.createRef<HTMLDivElement>();
  const inputRef = React.createRef<HTMLDivElement>();
  const [listMessages, setListMessages] = React.useState<ForumMessage[]>([]);
  const [dialogTitle, setDialogTitle] = React.useState('Без темы');
  const [editMsgNow, setEditMsgNow] = React.useState(-1);
  const {data} = useAppSelector(getUserData);
  const [openModal, setOpen] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(-1);

  const handleOpenEmoji = () => emojiRef.current?.classList.toggle('show');
  const handleSendEmoji = (index: number) => {
    if (editMsgNow > 0) {
      handleSendMessageEdit(emojis[index]);
      setEditMsgNow(-1);
    } else {
      handleSendMessage(emojis[index]);
    }
    const input = inputRef.current?.querySelector('input') as HTMLInputElement;
    input.value = '';
    handleOpenEmoji();
  };
  const getListMessages = () => {
    forumApi.getMessages(dialogId).then((response) => {
      setDialogTitle(response.name);
      setListMessages(response.messages);
    });
  };
  const handleSendMessage = (text: string) => {
    forumApi.createMessage(dialogId, text,
        (data.display_name || data.first_name)).
        then(() => getListMessages());
  };
  const handleSendMessageEdit = (text: string) => {
    forumApi.editMessage(editMsgNow, text).
        then(() => getListMessages());
  };
  const handleKeyPressOnInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode == 13) {
      const target = e.target as HTMLInputElement;
      const text: string = target.value;
      if (editMsgNow > 0) {
        handleSendMessageEdit(text);
        setEditMsgNow(-1);
      } else {
        handleSendMessage(text);
      }
      target.value = '';
    }
  };
  const handleClickOnMsgEdit = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      msgInfo: ForumMessage) => {
    const input = inputRef.current?.querySelector('input') as HTMLInputElement;
    input.value = msgInfo.text;
    setEditMsgNow(msgInfo.id);
  };
  const handleClickOnMsgDelete = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      msgInfo: ForumMessage) => {
    setOpenModalDelete(msgInfo.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenModalDelete(-1);
    getListMessages();
  };

  React.useEffect(() => {
    getListMessages();
  }, []);

  const theme = useTheme();

  return (
      <PageLayout>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className="page__content-img"
            id="forum-dialog"
            style={{backgroundImage: `url(${theme.forumBgImage})`}}>
          <Grid container item direction="row" justifyContent="flex-end">
            <Link to="/forum">
              <Button variant="contained">Назад</Button>
            </Link>
          </Grid>
          <Grid item sx={{flex: 1}}>
            <Box className="form form__full-size form__transparent"
                 style={{
                   backgroundColor: theme.backgroudOpacity,
                   borderColor: theme.borderColor,
                   borderWidth: theme.borderWidht,
                   borderStyle: theme.borderStyle,
                   boxShadow: theme.boxShadow,
                 }}>
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
                    {row.userName},
                    <span className="msg-time">{(new Date(
                        row.creationDate)).toLocaleString()}</span>
                    {data.first_name == row.userName &&
                    <IconButton
                        aria-label="add"
                        color="primary"
                        title="Редактировать сообщение"
                        onClick={(e) =>
                            handleClickOnMsgEdit(e, row)}
                        sx={{
                          alignItems: 'flex-end',
                        }}>
                      <EditIcon fontSize="small"/>
                    </IconButton>
                    }
                    {data.first_name == row.userName &&
                    <IconButton
                        aria-label="add"
                        color="primary"
                        title="Удалить сообщение"
                        onClick={(e) =>
                            handleClickOnMsgDelete(e, row)}
                        sx={{
                          alignItems: 'flex-end',
                        }}>
                      <DeleteIcon fontSize="small"/>
                    </IconButton>
                    }
                    {' '}
                  </span>
                      <span>{row.text}</span>
                    </Grid>
                ))}
                <AlwaysScrollToBottom/>
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
                    ref={inputRef}
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
        <ModalComponent show={openModal} handleClose={handleClose}
                        dialogTitle="Удалить сообщение">
          <ContentModalThemeDelete handleClose={handleClose}
                                   idForDelete={openModalDelete}/>
        </ModalComponent>
      </PageLayout>
  );
};

export default ForumDialogPage;
