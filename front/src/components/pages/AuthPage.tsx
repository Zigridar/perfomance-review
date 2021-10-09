import {Button, Card, Col, Form, FormInstance, Input, Row, Typography} from 'antd';
import React, {CSSProperties} from 'react';
import {AuthBody} from '../../../../src/common_types/API';

export interface IAuthPageProps {
  login: (credentials: AuthBody) => void;
  loading: boolean
}

const itemStyle: CSSProperties = {
  padding: '10px 0 10px 0'
}

//todo
const buttonColor = '#273241'
const backColor = '#f3f4f8'

const { Paragraph } = Typography

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
      className="full-height"
      justify={'space-around'}
      align={'middle'}
    >
      <Col span={5}>
        <Card
          bodyStyle={{
            backgroundColor: backColor
          }}
        >
          <Row
            className="full-height"
            justify={'space-around'}
            align={'middle'}
          >
            <Form
              form={form}
              style={{
                paddingTop: '20px'
              }}
              name="login"
            >
              <Paragraph style={{ textAlign: "center", fontSize: '25px' }}>Вход</Paragraph>
              <Form.Item
                style={itemStyle}
                name="login"
                rules={[{required: true, message: 'Пожалуйста, введите логин'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                style={itemStyle}
                name="password"
                rules={[{required: true, message: 'Пожалуйста, введите пароль'}]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item
                style={itemStyle}
              >
                <Button
                  style={{
                    width: '100%',
                    backgroundColor: buttonColor,
                    borderColor: buttonColor,
                  }}
                  type="primary"
                  htmlType="button"
                  onClick={login}
                  disabled={props.loading}
                >
                  Войти
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
