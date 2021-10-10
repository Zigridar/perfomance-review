import React, {useState} from "react";
import {Button, Form, Input, Select, Typography} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import QuestionModal from "./pages/QuestionModal";
import {IQuestion} from "../../../src/common_types/interfaces/Question";
import {IForm} from "../../../src/common_types/interfaces/Form";
import {AROUND, ATTESTATION, SELF_ATTESTATION} from "../../../src/common_types/interfaces/Review";

const {Paragraph} = Typography;


interface FormProps {
  onCancel: () => void;
  onOk: (form: IForm) => void;
}

const FormForm: React.FC<FormProps> = (props) => {

  const {onCancel, onOk} = props;

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const [form] = Form.useForm<IForm>(null);

  const onSuccess = () => {
    form.validateFields().then(res => {
      res.questions = questions
      onOk(res)
    })
  }

  const [visible, setVisible] = useState(false);

  const select = (selected: IQuestion[]) => {
    setVisible(false);
    setQuestions(selected);
  }

  return (
    <>
      <Paragraph
        style={{
          fontSize: '35px'
        }}
      >
        Добавление анкеты
      </Paragraph>
      <Form
        form={form}
        layout={'vertical'}
      >
        <Form.Item
          label={'Название'}
          name={'description'}
        >
          <Input
            style={{
              backgroundColor: '#f0f2f5'
            }}
          />
        </Form.Item>
        <Form.Item
          label={'Разделы'}
          name={'type'}
          valuePropName="checked"
        >
          <Select>
            <Select.Option value={AROUND}>Оценка 360</Select.Option>
            <Select.Option value={ATTESTATION}>Аттестация</Select.Option>
            <Select.Option value={SELF_ATTESTATION}>Самооценка</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={'Вопросы'}
        >
          <div
            style={{
              maxHeight: '350px',
              overflowY: 'auto'
            }}
          >
            <Form.List
              name={'questions'}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(filed => (
                    <>
                      <Form.Item key={filed.key} >
                        <div
                          style={{
                            height: '40px',
                            borderRadius: 2,
                            border: '1px solid #dedddd',
                            position: "relative"
                          }}
                        >
                          <p
                            style={{
                              position: "absolute",
                              top: '50%',
                              padding: '20px',
                              transform: 'translate(0%, -50%)'
                            }}
                          >
                            Question
                          </p>
                          <CloseOutlined
                            onClick={() => remove(filed.name)}
                            style={{
                              position: "absolute",
                              right: '10px',
                              top: '50%',
                              transform: 'translate(-50%, -50%)'
                            }}
                          />
                        </div>
                      </Form.Item>
                    </>
                  ))}
                  <Form.Item>
                    <PlusOutlined/>
                    <Button style={{ color: '#000' }} type={'link'} onClick={() => setVisible(true)}>Добавить вопросы</Button>
                  </Form.Item>
                  <QuestionModal onCancel={() => setVisible(false)} visible={visible} onSelect={(questions) => { add(); select(questions) }}/>
                </>
              )}
            </Form.List>
          </div>
        </Form.Item>
          <Button
            onClick={onSuccess}
            type={"primary"}
            style={{
              width: '30%',
              backgroundColor: '#273241',
              borderColor: '#273241',
              fontWeight: "bold"
            }}
          >
            Сохранить
          </Button>
        <Button
          onClick={onCancel}
          type={"primary"}
          style={{
            width: '30%',
            backgroundColor: '#273241',
            borderColor: '#273241',
            fontWeight: "bold"
          }}
        >
          Отмена
        </Button>
      </Form>
    </>
  )
}

export default FormForm
