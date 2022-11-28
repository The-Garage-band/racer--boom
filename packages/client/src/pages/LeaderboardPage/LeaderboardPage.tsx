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
import {FC, useEffect, useState} from 'react'

import { useTheme } from '@mui/material/styles';

import '@/pages/LeaderboardPage/LeaderboardPage.less'
import '@/styles/table.less'
import '@/styles/page.less'
import {ILeaderboard, getLeaderboardList} from "@/API/Leaderboard";

const LeaderboardPage: FC = () => {
  const [rows, setRows] = useState<ILeaderboard[]>([]);
  useEffect(() => {
    getLeaderboardList(7)
        .then((fetchedRows) => setRows(fetchedRows));
  }, []);

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
                      {row.name || 'Без имени'}
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
