import { CircularProgress } from '@mui/material'
import PageLayout from '@/hocs/page-layout'

const Loader = () => {
  return (
    <PageLayout>
      <CircularProgress color="primary" />
    </PageLayout>
  )
}

export default Loader
