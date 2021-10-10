import React, {useState} from "react";
import {Button, Tag, Layout, Typography} from "antd";
import FormForm from "./FormForm";
import CustomTable from "./Table";
import { ReviewType, ATTESTATION, AROUND } from "../../../src/common_types/interfaces/Review";
import { IReviewTag, getReviewTag } from "../constants/ReviewTags";

interface FormProps {

}


const columns = [
  {
    dataIndex: 'number',
    key: 'number',
    width: '5%',
    title: '№',
  },
  {
    dataIndex: 'name',
    key: 'name',
    width: '40%',
    title: 'Название',
  },
  {
    dataIndex: 'date',
    key: 'date',
    width: '20%',
    title: 'Дата',

  },
  {
    dataIndex: 'tags',
    key: 'tags',
    width: '30%',
    title: 'Разделы',
    render: (tags: Array<IReviewTag>) => (
      <>
        {tags.map((tag: IReviewTag) => (
          <Tag key={tag.type} color={tag.color}>{tag.title}</Tag>
        ))}
      </>
    )
  },
];


// todo
const dataSource = [
  {
    key: '1',
    number: '1',
    name: 'Вопрос 1',
    date: '21.10.2021',
    // todo
    tags: [ATTESTATION, AROUND].map((type: ReviewType) => getReviewTag(type)),
  },
  {
    key: '2',
    number: '2',
    name: 'Вопрос 2',
    date: '22.10.2021',
    // todo
    tags: [AROUND].map((type: ReviewType) => getReviewTag(type)),
  },
];

const QuestionForm: React.FC<FormProps> = (props) => {

  const [openAddForm, setOpenAddForm] = useState(false);

  return (
    <div
      style={{
        padding: '30px'
      }}
    >
      {openAddForm ?  <FormForm />
      : 
      <>
        <Typography.Title
          style={{
            fontSize: '35px'
          }}
        >
          Анкеты
        </Typography.Title>
        <Layout.Content className="table-wrapper"  style={{
          borderRadius: 3,
          marginBottom: 24,
          minHeight: 450,
          backgroundColor: 'white',
        }}>
          <CustomTable loading={true} columns={columns} dataSource={dataSource} />
        </Layout.Content>
        <Button
          type={"primary"}
          style={{
            width: '30%',
            backgroundColor: '#273241',
            borderColor: '#273241',
            fontWeight: "bold"
          }}
          onClick={() => setOpenAddForm(true)}
        >
          Добавить
        </Button>
        </>
      }
    </div>
  )
}

export default QuestionForm
