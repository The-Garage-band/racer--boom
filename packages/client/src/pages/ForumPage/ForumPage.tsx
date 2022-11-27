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
} from '@mui/material'
import PageLayout from '@/hocs/page-layout'
import { ModalComponent } from '@/components/ModalComponent'
import { FC } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useNavigate, Link } from 'react-router-dom'
import * as React from 'react'
import { useTheme } from '@mui/material/styles';

import '@/pages/ForumPage/ForumPage.less'
import '@/styles/table.less'
import '@/styles/page.less'

interface TCreateDataParams {
  id: number
  title: string
  theme: number
  answer: number
}

function createData(params: TCreateDataParams) {
  return { ...params }
}

class ContentModal extends React.PureComponent {
  render() {

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
          variant="standard"
        />
      </DialogContent>
    )
  }
}

const ForumPage: FC = () => {
  const navigate = useNavigate()

  const rows = [
    createData({ id: 0, title: 'Новые игры', theme: 222, answer: 345 }),
    createData({ id: 1, title: 'Технологии', theme: 120, answer: 578 }),
  ]
  const [openModal, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleNavigateToDialog = (dialogId: number, dialogTitle: string) => {
    navigate(`/forum/${dialogId}`, { state: { dialogId, dialogTitle } })
  }

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
        <Grid item sx={{ flex: 1 }}>
          <Box className="form form__full-size form__transparent"  
            style={{
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
              <h1 className="form__title">Список форумов</h1>
              <IconButton
                aria-label="add"
                color="primary"
                onClick={handleClickOpen}
                sx={{ marginBottom: '50px', alignItems: 'flex-end' }}>
                <ControlPointIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Table className="table table-unborder">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ width: '70%' }} style={{color: theme.palette.text.secondary}}>
                    Форумы
                  </TableCell>
                  <TableCell align="center" style={{color: theme.palette.text.secondary}}>Темы</TableCell>
                  <TableCell align="center" style={{color: theme.palette.text.secondary}}>Ответы</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    hover={true}
                    role="checkbox"
                    key={index}
                    onClick={() => handleNavigateToDialog(row.id, row.title)}>
                    <TableCell component="td" scope="row" sx={{ width: 100 }}>
                      {row.title}
                    </TableCell>
                    <TableCell component="td" scope="row" align="center">
                      {' '}
                      {row.theme}
                    </TableCell>
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
        <ContentModal />
      </ModalComponent>
    </PageLayout>
  )
}

export default ForumPage
