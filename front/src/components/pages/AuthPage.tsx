import {Avatar, Button, Card, Col, Form, FormInstance, Input, Row} from 'antd';
import React from 'react';
import {AuthBody} from '../../../../src/common_types/API';
import logo from '../../img/logo.png';

export interface IAuthPageProps {
  login: (credentials: AuthBody) => void;
  loading: boolean
}

/** Login form */
export const AuthPage: React.FC<IAuthPageProps> = (props: IAuthPageProps) => {

  const [form]: [FormInstance<AuthBody>] = Form.useForm<AuthBody>();

  const login = () => {
    form.validateFields()
      .then(props.login)
      .catch(console.error)
  }

  return (
    <Row
      style={{
        backgroundColor: '#f7ffff'
      }}
      className="full-height"
      justify={'space-around'}
      align={'middle'}
    >
      <Col
        span={6}
      >
        <Card
          bodyStyle={{
            backgroundColor: '#f1fdff'
          }}
        >
          <Row
            className="full-height"
            justify={'space-around'}
            align={'middle'}
          >
            <Avatar
              style={{
                justifyContent: 'center'
              }}
              size={150}
              src={logo}
            />
            <Form
              form={form}
              style={{
                paddingTop: '20px'
              }}
              name="login"
            >
              <Form.Item
                label="Login"
                name="login"
                rules={[{required: true, message: 'Please input your username!'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item
              >
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={login}
                  disabled={props.loading}
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
