import {
  Grid,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  Avatar,
  TableRow
} from '@mui/material'
import { Link } from 'react-router-dom'
import PageLayout from '../../hocs/page-layout'

import './LeaderboardPage.less'
import '../../styles/table.less'
import '../../styles/page.less'

function createData(
  name: string, point: number, avatar = '../public/avatar.png') {
  return { avatar, name, point }
}

const LeaderboardPage = () => {
  const rows = [
    createData('username 1', 7000000),
    createData('username 2', 600000),
    createData('username 3', 50000),
    createData('username 4', 4000),
    createData('username 5', 300),
    createData('username 6', 20),
    createData('username 7', 1)
  ]

  return (
    <PageLayout>
      <Grid container direction='column' justifyContent='center'
            alignItems='stretch' id='leaderboard' className='page__content-img'>
        <Grid container item direction='row' justifyContent='flex-end'>
          <Link to='/'><Button variant='contained'>Назад</Button></Link>
        </Grid>
        <Grid item>
          <Box className='form form__full-size form__transparent'>
            <h1 className='form__title'>Список лидеров</h1>
            <Table className='table table-unborder'>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow hover={true} role='checkbox' key={index}>
                    <TableCell component='td' scope='row' align='center'>
                      {index + 1}
                    </TableCell>
                    <TableCell component='td' scope='row' align='center'
                               sx={{ width: 100 }}>
                      <Avatar src={row.avatar} sx={{ width: 80, height: 80 }} />
                    </TableCell>
                    <TableCell component='td' scope='row' align='left'>
                      {row.name}
                    </TableCell>
                    <TableCell component='td' scope='row' align='right'>
                      {row.point}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default LeaderboardPage
