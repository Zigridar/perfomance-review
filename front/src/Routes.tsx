import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthBody } from '../../src/common_types/API';
import { AuthPage } from './components/pages/AuthPage';
import MainPage from './components/pages/MainPage';
import AuthContext from './context/AuthContext';

interface IRoutesProps {
  login: (credentials: AuthBody) => void;
  loading: boolean;
}

const Routes: React.FC<IRoutesProps> = (props) => {

  const context = useContext(AuthContext);

  const { loading, login } = props;

  return (
    <>
      {context.isAuth &&
      <Switch>
        <Route path="/main">
          <MainPage/>
        </Route>
        <Redirect to="/main"/>
      </Switch>
      }
      {!context.isAuth &&
        <Switch>
          <Route path="/" exact>
            <AuthPage login={login} loading={loading}/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      }
    </>
  );
};

export default Routes;