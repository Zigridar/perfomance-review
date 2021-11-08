import { Button, Modal, Table, Typography } from 'antd';
import CheckableTag from 'antd/es/tag/CheckableTag';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IQuestion, QuestionType } from '../../../../src/common_types/interfaces/Question';
import { ReviewType } from '../../../../src/common_types/interfaces/Review';
import { RootState } from '../../redux/store';

const { Text } = Typography;

interface OwnProps {
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

const tags = ['Самооценка', 'Оценка 360', 'Аттестация'];


interface StateProps {
  questions: IQuestion[]
}

type Props = OwnProps & StateProps;

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => ({
  questions: state.question.questions,
});

const columns = [
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

const QuestionModal: React.FC<Props> = (props) => {

  const { visible, onSelect, onCancel, questions } = props;

  const [selected, setSelected] = useState<Set<React.Key>>(new Set());

  const finishSelect = () => {
    const res: IQuestion[] = [];
    selected.forEach(index => {
      res.push(questions[Number(index)]);
    });
    onSelect(res);
  };

  const data: DataType[] = questions.map((item, index) => {
    return {
      key: index,
      //todo
      types: [],
      questionType: item.type,
      question: item.text,
      index,
    };
  });

  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={'700px'}
      bodyStyle={{
        height: '600px',
      }}
      centered={true}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
        }}
      >
        <div>
          <Text
            style={{
              fontSize: '30px',
            }}
          >
            Вопросы
          </Text>
          {tags.map((tag, index) => {

            const [check, setCheck] = useState(false);

            return (
              <CheckableTag
                key={index}
                checked={check}
                onClick={() => setCheck(prev => !prev)}
              >
                {tag}
              </CheckableTag>
            );
          })}
        </div>
        <Table
          rowSelection={{
            onSelect: (item, selected) => {
              if (selected)
                setSelected(prev => new Set(prev.add(item.key)));
              else
                setSelected(prev => {
                  prev.delete(item.key);
                  return new Set(prev);
                });
            },
            selectedRowKeys: Array.from(selected),
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
            position: 'absolute',
            bottom: '0px',
          }}
        >
          <Button
            onClick={finishSelect}
            type={'primary'}
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
  );
};

export default connect<StateProps, never, OwnProps>(mapStateToProps)(QuestionModal);
