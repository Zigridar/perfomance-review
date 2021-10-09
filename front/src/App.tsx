import 'antd/dist/antd.css';
import {message} from 'antd';
import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {APIPath} from '../../src/APIPath';
import {AuthBody, ILoginMessage} from '../../src/common_types/API';
import AuthContext, {IAuthContext} from './context/AuthContext';
import useHttp from './hooks/useHttp.hook';
import store from './redux/store';
import Routes from './Routes';

export const App = () => {

  /** is user authenticated now? **/
  const [isAuth, setAuth] = useState<boolean>(false); //todo fix auth bug

  /** is user admin */
  const [admin, setAdmin] = useState<boolean>(false);

  /** http request utils */
  const { request, loading } = useHttp();

  /** login using http request */
  const login = (credentials: AuthBody) => {
    request<ILoginMessage>(APIPath.auth, 'POST', credentials)
      .then((res) => {
        if (res.roomToken) {
          setAuth(() => true);
          setAdmin(() => !!res.admin);
        }
        else
          message.error('not auth', 2);
      })
  };

  /** logout - clear aut token from cookie */
  const logout = () => {
    request(APIPath.auth, 'DELETE')
      .finally(() => {
        setAuth(() => false);
        setAdmin(() => false);
      })
  }

  /** global auth context */
  const context: IAuthContext = {
    logout,
    admin,
    isAuth
  }

  return (
    <AuthContext.Provider value={context}>
      <BrowserRouter>
        <Provider store={store}>
          <Routes login={login} loading={loading} />
        </Provider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
