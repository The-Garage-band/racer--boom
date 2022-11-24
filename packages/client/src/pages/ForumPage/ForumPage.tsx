import {Grid, Box, Button, IconButton, TextField} from '@mui/material';
import {Table, TableBody, TableCell, TableRow, TableHead} from '@mui/material';
import {DialogContent, DialogActions, DialogContentText} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PageLayout from '@/hocs/page-layout';
import {ModalComponent} from '@/components/ModalComponent';
import {FC, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import * as React from 'react';
import {forumApi, Forums} from '@/API/ForumApi';

import '@/pages/ForumPage/ForumPage.less';
import '@/styles/table.less';
import '@/styles/page.less';

interface TModalCreateTheme {
  handleClose: () => void
}

const ContentModal: FC<TModalCreateTheme> = (props: TModalCreateTheme) => {
  const {handleClose} = props;
  const [value, setValue] = React.useState('Без темы');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((event.target as HTMLTextAreaElement).value);
  };

  const handleOk = () => {
    forumApi.createTheme(value).then(() => {
      handleClose();
    });
  };

  return (
      <div>
        <DialogContent>
          <DialogContentText>
            <i>Создадим новую тему, где можно обсудить какие-то проблемы или
              поделиться успехами</i>
          </DialogContentText>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Название темы"
              onChange={handleChange}
              type="text"
              fullWidth
              variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleOk}>Создать
          </Button>
        </DialogActions>
      </div>
  );
};

const ForumPage: FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpen] = React.useState(false);
  const [listThemes, setListThemes] = React.useState<Forums[]>([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNavigateToDialog = (dialogId: number) => {
    navigate(`/forum/${dialogId}`, {state: {dialogId}});
  };
  const getListThemes = () => {
    forumApi.getThemes().then((response: Forums[]) => {
      setListThemes(response);
    });
  };

  useEffect(() => {
    getListThemes();
  }, []);
  useEffect(() => {
    getListThemes();
  }, [openModal]);

  return (
      <PageLayout>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className="page__content-img"
            id="forum">
          <Grid container item direction="row" justifyContent="flex-end">
            <Link to="/home">
              <Button variant="contained">Назад</Button>
            </Link>
          </Grid>
          <Grid item sx={{flex: 1}}>
            <Box className="form form__full-size form__transparent">
              <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                <h1 className="form__title">Форум</h1>
                <IconButton
                    aria-label="add"
                    color="primary"
                    title="Добавить тему"
                    onClick={handleClickOpen}
                    sx={{marginBottom: '50px', alignItems: 'flex-end'}}>
                  <ControlPointIcon fontSize="large"/>
                </IconButton>
              </Grid>
              <Table className="table table-unborder">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{width: '70%'}}>
                      Тема
                    </TableCell>
                    <TableCell align="center">Ответы</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listThemes.map((row, index) => (
                      <TableRow
                          hover={true}
                          role="checkbox"
                          key={index}
                          onClick={() => handleNavigateToDialog(row.id)}>
                        <TableCell component="td" scope="row" sx={{width: 100}}>
                          {row.name}
                        </TableCell>
                        <TableCell component="td" scope="row" align="center">
                          {row.countAnswer}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
        <ModalComponent show={openModal} handleClose={handleClose}
                        dialogTitle="Создать новую тему">
          <ContentModal handleClose={handleClose}/>
        </ModalComponent>
      </PageLayout>
  );
};

export default ForumPage;
