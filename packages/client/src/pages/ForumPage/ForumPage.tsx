import {Grid, Box, Button, IconButton, TextField} from '@mui/material';
import {Table, TableBody, TableCell, TableRow, TableHead} from '@mui/material';
import {DialogContent, DialogActions, DialogContentText} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import PageLayout from '@/hocs/page-layout';
import {ModalComponent} from '@/components/ModalComponent';
import {FC, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import * as React from 'react';
import {forumApi, Forums} from '@/API/ForumApi';
import {useAppSelector} from '@/hooks';
import {getUserData} from '@/store/slices/GetUserSlice';
import { useTheme } from '@mui/material/styles';

import '@/pages/ForumPage/ForumPage.less';
import '@/styles/table.less';
import '@/styles/page.less';


interface TModalThemeCreate {
  handleClose: () => void,
  idUser: number
}

interface TModalThemeDelete {
  handleClose: () => void,
  idForDelete : number
}

const ContentModalThemeCreate: FC<TModalThemeCreate> = (props: TModalThemeCreate) => {
  const {handleClose, idUser} = props;
  const [value, setValue] = React.useState('Без темы');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((event.target as HTMLTextAreaElement).value);
  };

  const handleOk = () => {
    forumApi.createTheme(value, idUser).then(() => {
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

const ContentModalThemeDelete: FC<TModalThemeDelete> = (props: TModalThemeDelete) => {
  const {handleClose, idForDelete} = props;

  const handleOk = () => {
    forumApi.deleteTheme(idForDelete).then(() => {
      handleClose();
    });
  };

  return (
      <div>
        <DialogContent>
          <DialogContentText>
            <i>Вы уверены что хотите удалить эту тему?</i>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleOk}>Да</Button>
          <Button type="submit" onClick={handleClose}>Нет</Button>
        </DialogActions>
      </div>
  );
};

const ForumPage: FC = () => {
  const {data} = useAppSelector(getUserData);
  const navigate = useNavigate();
  const [openModal, setOpen] = React.useState(false);
  const [openModalCreate, setOpenModalCreate] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(0);
  const [listThemes, setListThemes] = React.useState<Forums[]>([]);

  const handleClickOnModalThemeCreate = () => {
    setOpenModalCreate(true);
    setOpenModalDelete(0);
    setOpen(true);
  };
  const handleClickOnModalThemeDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    setOpenModalCreate(false);
    setOpenModalDelete(id);
    setOpen(true);
  };
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
    if (!openModal) {
      getListThemes();
    }
  }, [openModal]);

  const theme = useTheme();

  return (
      <PageLayout>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className="page__content-img"
            id="forum" style ={{backgroundImage: `url(${theme.forumBgImage})`}}>
          <Grid container item direction="row" justifyContent="flex-end">
            <Link to="/home">
              <Button variant="contained">Назад</Button>
            </Link>
          </Grid>
          <Grid item sx={{flex: 1}}>
            <Box className="form form__full-size form__transparent" style={{
              backgroundColor: theme.backgroudOpacity, 
              borderColor: theme.borderColor, 
              borderWidth: theme.borderWidht, 
              borderStyle: theme.borderStyle, 
              boxShadow: theme.boxShadow
            }}>
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
                    onClick={handleClickOnModalThemeCreate}
                    sx={{marginBottom: '50px', alignItems: 'flex-end'}}>
                  <ControlPointIcon fontSize="large"/>
                </IconButton>
              </Grid>
              <Grid
                  container
                  className="theme-list"
                  direction="row"
                  justifyContent="flex-start"
                  alignContent="flex-start">
                <Table className="table table-unborder" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{width: '70%'}} style={{color: theme.palette.text.secondary}}>
                        Тема
                      </TableCell>
                      <TableCell align="center" style={{color: theme.palette.text.secondary}}>Ответы</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listThemes.map((row, index) => (
                        <TableRow
                            hover={true}
                            role="checkbox"
                            key={index}
                            onClick={() => handleNavigateToDialog(row.id)}>
                          <TableCell component="td" scope="row"
                                     sx={{width: 100}} className="theme--info">
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignContent="center">
                              {row.name}
                              {data.id == row.creationUser &&
                              <IconButton
                                  aria-label="add"
                                  color="primary"
                                  title="Добавить тему"
                                  onClick={(e) =>
                                      handleClickOnModalThemeDelete(e, row.id)}
                                  sx={{
                                    alignItems: 'flex-end',
                                  }}>
                                <DeleteIcon fontSize="small"/>
                              </IconButton>
                              }
                            </Grid>
                            <span
                                className="theme--info-date">Создана: {(new Date(
                                row.creationDate)).toLocaleString()}</span>

                          </TableCell>
                          <TableCell component="td" scope="row" align="center">
                            {row.countAnswer}
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <ModalComponent show={openModal} handleClose={handleClose}
          dialogTitle={openModalCreate ? 'Создать новую тему' : 'Удалить'}>
          {openModalCreate ?
              (<ContentModalThemeCreate handleClose={handleClose} idUser={data.id}/>) :
              (<ContentModalThemeDelete handleClose={handleClose} idForDelete={openModalDelete}/>)
          }
        </ModalComponent>
      </PageLayout>
  );
};

export default ForumPage;
