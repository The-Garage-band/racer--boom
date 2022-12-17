import {FC, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import PageLayout from '@/hocs/page-layout';
import {useAppDispatch} from '@/hooks';
import {OAuthLogin} from '@/API/Auth';
import fetchUser from '@/store/slices/GetUserSlice';

const OAuthPage: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.search.split('code').length > 0) {
      const code = location.search.split('=');
      // @ts-ignore
      if (!code || code == '') {
        return;
      }

      OAuthLogin({
        code: code[1],
        redirect_uri: `${window.location.protocol}//${window.location.host}/oauth`,
      }).then(response => {
        dispatch(fetchUser()).then(({payload}) => {
          if (payload.id) {
            navigate('/home');
          }
        });
      });
    }
  }, [])

  return (
      <PageLayout>
        <div></div>
      </PageLayout>
  );
}

export default OAuthPage
