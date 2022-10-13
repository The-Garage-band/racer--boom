import {
  Grid,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
  DialogContentText,
  TextField,
  DialogContent,
} from '@mui/material';
import PageLayout from '../../hocs/page-layout';
import {ModalComponent} from '../../components/ModalComponent';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {useNavigate, Link} from 'react-router-dom';
import * as React from 'react';

import './ForumPage.less';
import '../../styles/table.less';
import '../../styles/page.less';

function createData(
    id: number, title: string, theme: number, answer = 0) {
  return {id, title, theme, answer};
}

const ContentModal = () => {
  return (
      <DialogContent>
        <DialogContentText>
          Создадим новую тему, где можно обсудить какие-то проблемы.
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="dialog_name"
            label="Название темы"
            type="text"
            fullWidth
            variant="standard"/>
      </DialogContent>
  );
};

const ForumPage = () => {
  const navigate = useNavigate();

  const rows = [
    createData(0, 'Новые игры', 222, 345),
    createData(1, 'Технологии', 120, 578),
  ];
  const [openModal, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNavigateToDialog = (dialogId: number, dialogTitle: string) => {
    navigate(`/dialog/${dialogId}`, {state: {dialogId, dialogTitle}});
  };

  return (
      <PageLayout>
        <Grid container direction="column" justifyContent="center"
              alignItems="stretch" className="page__content-img" id="forum">
          <Grid container item direction="row" justifyContent="flex-end">
            <Link to="/"><Button variant="contained">Назад</Button></Link>
          </Grid>
          <Grid item sx={{flex: 1}}>
            <Box className="form form__full-size form__transparent">
              <Grid container direction="row" justifyContent="center"
                    alignItems="center">
                <h1 className="form__title">Список форумов</h1>
                <IconButton aria-label="add" color="primary"
                            onClick={handleClickOpen}
                            sx={{marginBottom: '50px', alignItems: 'flex-end'}}>
                  <ControlPointIcon fontSize="large"/>
                </IconButton>
              </Grid>
              <Table className="table table-unborder">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"
                               sx={{width: '70%'}}>Форумы</TableCell>
                    <TableCell align="center">Темы</TableCell>
                    <TableCell align="center">Ответы</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                      <TableRow hover={true} role="checkbox" key={index}
                                onClick={() => handleNavigateToDialog(row.id,
                                    row.title)}>
                        <TableCell component="td" scope="row"
                                   sx={{width: 100}}>{row.title}</TableCell>
                        <TableCell component="td" scope="row"
                                   align="center"> {row.theme}</TableCell>
                        <TableCell component="td" scope="row" align="center">
                          {row.answer}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
        <ModalComponent show={openModal} handleClose={handleClose}>
          <ContentModal/>
        </ModalComponent>
      </PageLayout>
  );
};

export default ForumPage;
