import React, {useState} from "react";
import {Button, Modal, Table, Typography} from "antd";
import {ATTESTATION, ReviewType, SELF_ATTESTATION} from "../../../../src/common_types/interfaces/Review";
import {IQuestion, QuestionType} from "../../../../src/common_types/interfaces/Question";
import CheckableTag from "antd/es/tag/CheckableTag";

const {Text} = Typography

interface Props {
  visible: boolean;
  onSelect: (questions: IQuestion[]) => void;
  onCancel: () => void;
}

interface DataType {
  key: React.Key;
  question: string;
  types: ReviewType[];
  questionType: QuestionType;
  index: number;
}

const tags = ['Самооценка', 'Оценка 360', 'Аттестация']

const QuestionModal: React.FC<Props> = (props) => {

  const { visible, onSelect, onCancel } = props;

  const columns = [
    {
      //todo
      title: '41524',
      dataIndex: 'index'
    },
    {
      title: 'Вопрос',
      dataIndex: 'question',
    },
    {
      title: 'Тип',
      dataIndex: 'questionType',
    },
    {
      title: 'Типы',
      dataIndex: 'types',
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      index: 1,
      //todo
      question: 'sadsd',
      questionType: 'OPEN',
      types: [SELF_ATTESTATION, ATTESTATION]
    }
  ]

  const [selected, setSelected] = useState<Set<React.Key>>(new Set());

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={'700px'}
      bodyStyle={{
        height: '600px'
      }}
      centered={true}
    >
      <div
        style={{
          position: "relative",
          height: '100%'
        }}
      >
        <div>
          <Text
            style={{
              fontSize: '30px'
            }}
          >
            Вопросы
          </Text>
          {tags.map((tag, index) => {

            const [check, setCheck] = useState(false)

            return (
              <CheckableTag
                key={index}
                checked={check}
                onClick={() => setCheck(prev => !prev)}
              >
                {tag}
              </CheckableTag>
            )
          })}
        </div>
        <Table
          rowSelection={{
            onSelect: (item, selected) => {
              if (selected)
                setSelected(prev => new Set(prev.add(item.key)))
              else
                setSelected(prev => {
                  prev.delete(item.key)
                  return new Set(prev)
                })
            },
            selectedRowKeys: Array.from(selected)
          }}
          showHeader={false}
          pagination={false}
          columns={columns}
          dataSource={data}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: "absolute",
            bottom: '0px'
          }}
        >
          <Button
            onClick={() => onSelect([])}
            type={"primary"}
            style={{
              backgroundColor: '#273241',
              borderColor: '#273241',
              color: '#fff',
            }}
          >
            Выбрать
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default QuestionModal;
