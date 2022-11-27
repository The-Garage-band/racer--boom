import {
  Grid,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  Avatar,
  TableRow,
} from '@mui/material'
import { Link } from 'react-router-dom'
import PageLayout from '@/hocs/page-layout'
import { FC } from 'react'

import { useTheme } from '@mui/material/styles';

import '@/pages/LeaderboardPage/LeaderboardPage.less'
import '@/styles/table.less'
import '@/styles/page.less'

interface TCreateDataParams {
  name: string
  point: number
  avatar?: string
}
function createData(params: TCreateDataParams) {
  return { ...params }
}

const LeaderboardPage: FC = () => {
  const rows = [
    createData({ name: 'username 1', point: 7000000 }),
    createData({ name: 'username 2', point: 600000 }),
    createData({ name: 'username 3', point: 50000 }),
    createData({ name: 'username 4', point: 40000 }),
    createData({ name: 'username 5', point: 3000 }),
    createData({ name: 'username 6', point: 200 }),
    createData({ name: 'username 7', point: 10 }),
  ]

  const theme = useTheme();

  return (
    <PageLayout>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        id="leaderboard"
        className="page__content-img" style={{backgroundImage: `url(${theme.leaderBgImage})`}}>
        <Grid container item direction="row" justifyContent="flex-end">
          <Link to="/home">
            <Button variant="contained">Назад</Button>
          </Link>
        </Grid>
        <Grid item>
          <Box className="form form__full-size form__transparent" 
            style={{
              backgroundColor: theme.backgroudOpacity, 
              borderColor: theme.borderColor, 
              borderWidth: theme.borderWidht, 
              borderStyle: theme.borderStyle, 
              boxShadow: theme.boxShadow
            }}>
            <h1 className="form__title" style={{color: theme.palette.text.secondary}}>Список лидеров</h1>
            <Table className="table table-unborder">
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow hover={true} role="checkbox" key={index}>
                    <TableCell component="td" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="td"
                      scope="row"
                      align="center"
                      sx={{ width: 100 }}>
                      <Avatar src={row.avatar} sx={{ width: 80, height: 80 }} />
                    </TableCell>
                    <TableCell component="td" scope="row" align="left">
                      {row.name}
                    </TableCell>
                    <TableCell component="td" scope="row" align="right">
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
