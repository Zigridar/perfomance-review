import {Checkbox, DatePicker, Form, FormInstance, Input} from 'antd';
import moment from 'moment';
import React from 'react';
import {IUserWithId} from '../../../src/common_types/ModelTypes';

interface IUserFormProps {
  user: IFormUser;
  form: FormInstance<IFormUser>
}

export interface IFormUser extends IUserWithId {
  expDate: moment.Moment
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const UserForm: React.FC<IUserFormProps> = (props) => {

  const {user, form} = props;

  if (user && user.expirationDate)
    user.expDate = moment(user.expirationDate);

  form.setFieldsValue(user)

  const onFinish = () => {
    console.log(form.getFieldsValue());
  }

  return(
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name={'name'}
        label={'name'}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'login'}
        label={'login'}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'admin'}
        label={'admin'}
        valuePropName='checked'
      >
        <Checkbox />
      </Form.Item>
      <Form.Item
        name={'expDate'}
        label={'expiration date'}
        rules={[{ required: true, message: 'Expiration date required!' }]}
      >
        <DatePicker
          format={'hh:mm DD.MM.YYYY'}
          showTime
        />
      </Form.Item>
      <Form.Item
        name={'roomToken'}
        label={'token'}
      >
        <Input />
      </Form.Item>
      {
        (!user || !user.id) &&
        <Form.Item
          name={'password'}
          label={'password'}
          rules={[{ required: true, message: 'Password required!' }]}
        >
          <Input.Password />
        </Form.Item>
      }
    </Form>
  )
}

export default UserForm;