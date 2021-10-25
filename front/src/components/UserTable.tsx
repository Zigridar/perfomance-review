import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { Checkbox, Form, FormInstance, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { APIPath } from '../../../src/APIPath';
import { IUserMessage } from '../../../src/common_types/API';
import useHttp from '../hooks/useHttp.hook';
import { createUser, deleteUser, editUser } from '../redux/ActionCreators';
import { CreateUserAction, DeleteUserAction, EditUserAction } from '../redux/reducers/admin.reducer';
import { RootState } from '../redux/store';
import UserForm from './UserForm';
import { IUser, IUserWithId } from '../../../src/common_types/interfaces/User';

/** State props */
interface StateProps {
  users: ITableUser[];
}

/** Dispatch props */
interface DispatchProps {
  createUser: (user: IUserWithId) => CreateUserAction;
  editUser: (user: IUserWithId) => EditUserAction;
  deleteUser: (id: string) => DeleteUserAction;
}

/** Own table props */
interface OwnProps {
  loading: boolean;
}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => ({
  users: state.admin.users.map((user, index) => {
    const tableUser: ITableUser = {
      ...user,
      key: index.toString(),
    };
    return tableUser;
  }),
});

const mapDispatchToProps: DispatchProps = {
  createUser,
  editUser,
  deleteUser,
};

type UserTableProps = OwnProps & StateProps & DispatchProps;

interface ITableUser extends IUserWithId {
  key: string;
}

const UserTable: React.FC<UserTableProps> = (props: UserTableProps) => {

  const { request, loading } = useHttp();

  const deleteUser = (userId: string) => {
    request(APIPath.admin.root + APIPath.admin.user, 'DELETE', { id: userId })
      .then((withMessage) => {
        if (withMessage.message)
          props.deleteUser(userId);
      });
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: 'admin',
      dataIndex: 'admin',
      width: '15%',
      render: (value: boolean) => (
        <Checkbox
          checked={value}
          disabled={true}
        />
      ),
    },
    {
      title: 'login',
      dataIndex: 'login',
      width: '20%',
    },
    {
      title: 'room token',
      dataIndex: 'roomToken',
      width: '20%',
    },
    {
      title: 'expiration date',
      dataIndex: 'expirationDate',
      width: '10%',
      render: (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
      },
    },
    {
      title: 'delete',
      width: '10%',
      dataIndex: 'id',
      render: (id: string) => {
        return (<DeleteOutlined style={{ fontSize: '1.5rem' }} onClick={() => deleteUser(id)} />);
      },
    },
  ];

  const [visible, setVisible] = useState<boolean>(false);

  const [user, setUser] = useState<IUserWithId>(null);

  const [isCreate, setCreate] = useState<boolean>(false);

  const [isEdit, setEdit] = useState<boolean>(false);

  const openModal = () => setVisible(() => true);

  const [form]: [FormInstance<IUserWithId>] = Form.useForm<IUserWithId>();

  const onCancel = () => {
    form.resetFields();
    setUser(() => null);
    setVisible(() => false);
    setEdit(()=> false);
    setCreate(() => false);
  };

  const finishCreateUser = (user: IUser) => {
    request<IUserMessage>(APIPath.admin.root + APIPath.admin.user, 'PUT', user)
      .then(created => {
        if (created.user)
          props.createUser(created.user);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => setCreate(() => false));
  };

  const finishEditUser = (user: IUserWithId) => {
    request<IUserMessage>(APIPath.admin.root + APIPath.admin.user, 'POST', user)
      .then(edited => {
        if (edited.user)
          props.editUser(edited.user);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => setEdit(() => false));
  };

  const onOk = () => {
    form.validateFields()
      .then((editable) => {
        setVisible(()=> false);
        if (user && user.id)
          editable.id = user.id;
        form.resetFields();
        return editable;
      })
      .then(edited => {
        if (isCreate)
          finishCreateUser(edited);
        else if (isEdit)
          finishEditUser(edited);
      })
      .catch(e => console.error(e)); //todo
  };

  const beginCreateUser = () => {
    setUser(() => null);
    setCreate(() => true);
    openModal();
  };

  const beginEditUser = (user: ITableUser) => {
    setUser(() => user);
    setEdit(() => true);
    openModal();
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        title={isEdit ? 'Edit user' : (isCreate ? 'Create user' : 'User')}
      >
        <UserForm user={user} form={form}/>
      </Modal>
      <UserAddOutlined style={{ fontSize: '1.5rem' }} onClick={beginCreateUser} />
      <Table
        scroll={{
          y: 500,
          scrollToFirstRowOnChange: false,
        }}
        loading={loading || props.loading}
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              if (!loading) {
                beginEditUser(record);
              }
            },
            onContextMenu: event => {
              event.preventDefault();
            },
          };
        }}
        pagination={false}
        bordered
        dataSource={props.users}
        columns={columns}
      />
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(UserTable);
