import React, {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {AuthBody} from '../../src/common_types/API';
import {AuthPage} from './components/pages/AuthPage';
import MainPage from './components/pages/MainPage';
import AuthContext from './context/AuthContext';

interface IRoutesProps {
  login: (credentials: AuthBody) => void;
  loading: boolean;
}

const Routes: React.FC<IRoutesProps> = (props) => {

  const context = useContext(AuthContext);

  return (
    <>
      {context.isAuth &&
      <Switch>
        <Route path="/main">
          <MainPage logout={context.logout} />
        </Route>
        <Redirect to="/main"/>
      </Switch>
      }
      {!context.isAuth &&
        <Switch>
          <Route path="/" exact>
            <AuthPage login={props.login} loading={props.loading}/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      }
    </>
  )
}

export default Routes;