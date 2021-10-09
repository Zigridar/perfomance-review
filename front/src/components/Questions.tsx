import React, {ReactNode, useEffect, useState} from "react";
import {Checkbox, Form, Input, Modal, Select, Table} from "antd";
import {CLOSED, IQuestion, IQuestionWithId, OPEN} from "../../../src/common_types/interfaces/Question";
import {CreateQuestionAction, LoadQuestionsAction} from "../redux/reducers/question.reducer";
import {connect} from "react-redux";
import {RootState} from "../redux/store";
import {createQuestion, loadQuestions} from "../redux/ActionCreators";
import useHttp from "../hooks/useHttp.hook";
import {APIPath} from "../../../src/APIPath";
import {PlusOutlined} from "@ant-design/icons";
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
      <div
        style={{
          padding: '30px'
        }}
      >
        <PlusOutlined
          style={{
            fontSize: '20px'
          }}
          onClick={beginCreate}
        />
      </div>
      <Table
        columns={columns}
        loading={loading}
        pagination={false}
        dataSource={questions}
      />
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
            label={'Тип'}
            name={'type'}
          >
            <Select>
              {/*<Select.Option value={CLOSED}>{CLOSED}</Select.Option>*/}
              <Select.Option value={OPEN} >{OPEN}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={'variable'}
            label={'variable'}
            valuePropName="checked"
          >
            <Checkbox/>
          </Form.Item>
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
