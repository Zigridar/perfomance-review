import {LogoutOutlined} from '@ant-design/icons';
import {Layout, PageHeader, Space, Tabs, Typography} from 'antd';
import React, {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {APIPath} from '../../../../src/APIPath';
import {IUsersMessage} from '../../../../src/common_types/API';
import {IUserWithId} from '../../../../src/common_types/ModelTypes';
import AuthContext from '../../context/AuthContext';
import useHttp from '../../hooks/useHttp.hook';
import {loadUsers} from '../../redux/ActionCreators';
import {LoadUsersAction} from '../../redux/reducers/admin.reducer';
import {RootState} from '../../redux/store';
import UserTable from '../UserTable';

const {Content} = Layout;

const {TabPane} = Tabs;

const {Title} = Typography;

const iconSize = '2.4rem';

interface OwnProps {
  logout: () => void;
}

interface StateProps {

}

interface DispatchProps {
  loadUsers: (users: IUserWithId[]) => LoadUsersAction;
}

const mapStatToProps = (state: RootState): StateProps => ({})

const mapDispatchToProps: DispatchProps = {
  loadUsers
}

type MainPageProps = StateProps & DispatchProps & OwnProps

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {

  const { request, loading } = useHttp();

  /** auth context */
  const context = useContext(AuthContext);

  /** load users for admin */
  useEffect(() => {
    if (context.admin)
      request<IUsersMessage>(APIPath.admin.root + APIPath.admin.user, 'GET')
        .then(withUsers => {
          if (withUsers.users)
            props.loadUsers(withUsers.users);
        })
  }, [context.admin]);

  return (
    <Layout className="full-height">
      <PageHeader
        style={{background: '#8d4cbe', padding: '0 10px 0 10px'}}
        extra={
          <Space size={'large'} style={{float: 'right', padding: '10px'}}>
            <LogoutOutlined onClick={props.logout} className="click" style={{fontSize: iconSize}}/>
          </Space>
        }
      />
      <Content className="full-height" style={{background: '#fff'}}>
        <Tabs className="full-height" tabPosition='left'>
          <TabPane className="full-height" tab={<Title level={5}>Your room</Title>} key="1">
          </TabPane>
          {
            context.admin &&
            <>
              <TabPane tab={<Title level={5}>Users</Title>} key="2">
                <UserTable loading={loading}/>
              </TabPane>
              <TabPane tab={<Title level={5}>Rooms</Title>} key="3">
              </TabPane>
            </>
          }
        </Tabs>
      </Content>
    </Layout>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(mapStatToProps, mapDispatchToProps)(MainPage)
