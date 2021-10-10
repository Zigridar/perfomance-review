import React, {ReactNode, useEffect, useState} from "react";
import {Button, Checkbox, Layout, Form, Input, Modal, Radio, Table, Typography} from "antd";
import {IQuestion, IQuestionWithId, OPEN} from "../../../src/common_types/interfaces/Question";
import {CreateQuestionAction, LoadQuestionsAction} from "../redux/reducers/question.reducer";
import {connect} from "react-redux";
import {RootState} from "../redux/store";
import {createQuestion, loadQuestions} from "../redux/ActionCreators";
import useHttp from "../hooks/useHttp.hook";
import {APIPath} from "../../../src/APIPath";
import {useForm} from "antd/es/form/Form";



interface QuestionsProps {

}

interface StateProps {
  questions: IQuestion[];
}

interface DispatchProps {
  createQuestion: (question: IQuestion) => CreateQuestionAction;
  loadQuestions: (questions: IQuestion[]) => LoadQuestionsAction;
}

type Props = QuestionsProps & StateProps & DispatchProps;

interface Column {
  title: string;
  key: string;
  dataIndex: string;
  render?: (text: string, record: IQuestion, index: number) => ReactNode;
}

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => ({
  questions: state.questions.questions
})

const dispatchProps: DispatchProps = {
  createQuestion,
  loadQuestions
}

const columns: Array<Column> = [
  {
    title: 'Вопрос',
    key: 'text',
    dataIndex: 'text',
    render: (text, record) => {
      return (
        <>
          <div key={text}>{text}</div>
          {record?.answers?.map((answer, index) => (
            <div key={index}>
              {answer.text}
            </div>
          ))}
        </>
      )
    }
  },
  {
    title: 'Тип',
    key: 'type',
    dataIndex: 'type'
  }
]


const Questions: React.FC<Props> = (props) => {

  const {questions, createQuestion, loadQuestions} = props

  const [visible, setVisible] = useState<boolean>(false);
  const [typeQuestion, setTypeQuestion] = useState<'open' | 'close'>('open');


  const { request, loading } = useHttp();

  const [form] = useForm<IQuestion>(null)

  useEffect(() => {
    request<{ questions: IQuestionWithId[] }>(APIPath.question).then(res => {
      console.log(res)
      loadQuestions(res.questions);
    })
  }, []);

  const beginCreate = () => {
    setVisible(true)
  }

  const cancel = () => {
    setVisible(false)
  }

  const onOk = () => {
    form.validateFields().then(question => {
      return request<{ question: IQuestion }>(APIPath.question, 'PUT', question)
    })
      .then(res => {
        createQuestion(res.question);
      })
  }

  return (
    <div
      style={{
        padding: '30px'
      }}
    >
      <Typography.Title
        style={{
          fontSize: '35px'
        }}
      >
        Вопросы
      </Typography.Title>
      <Layout.Content style={{
            borderRadius: 3,
            marginBottom: 24,
            minHeight: 450,
            backgroundColor: 'white',
          }}>
        <Table
          columns={columns}
          loading={loading}
          pagination={false}
          dataSource={questions}
        />
      </Layout.Content>
      <Button
        type={"primary"}
        style={{
          width: '30%',
          backgroundColor: '#273241',
          borderColor: '#273241',
          fontWeight: "bold",
          marginTop: 36,
        }}
        onClick={() => setVisible(true)}
      >
        Добавить
      </Button>
      <Modal
        title={'Создание вопроса'}
        visible={visible}
        onCancel={cancel}
        onOk={onOk}
      >
        <Form
          form={form}
          layout={"vertical"}
        >
          <Form.Item
            label={'Вопрос'}
            name={'text'}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label={'Тип вопроса'}
            name={'type'}
          >
            <Radio.Group value={typeQuestion} onChange={(e) => setTypeQuestion(e.target.value)}>
              <Radio value="open">Открытый</Radio>
              <Radio value="close">С вариантами ответа</Radio>
            </Radio.Group>
          </Form.Item>
          {typeQuestion === 'close' && <Form.Item
            label={'Вопрос'}
            name={'text'}
          >
            <Input/>
          </Form.Item>}
        
          <Form.Item
            label={'scored'}
            name={'scored'}
            valuePropName="checked"
          >
            <Checkbox/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect<StateProps, DispatchProps, QuestionsProps>(mapStateToProps, dispatchProps)(Questions);
