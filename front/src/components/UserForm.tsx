import {Checkbox, Form, FormInstance, Input} from 'antd';
import React from 'react';
import {IUserWithId} from '../../../src/common_types/ModelTypes';

interface IUserFormProps {
  user: IUserWithId;
  form: FormInstance<IUserWithId>
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const UserForm: React.FC<IUserFormProps> = (props) => {

  const {user, form} = props;

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
