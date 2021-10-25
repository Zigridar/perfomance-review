import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IForm } from '../../../src/common_types/interfaces/Form';
import { CreateFormAction, LoadFormsAction } from '../redux/reducers/form.reducer';
import { RootState } from '../redux/store';
import { createForm, loadForms } from '../redux/ActionCreators';
import CustomTable from './Table';
import { Button, Layout, Tag, Typography } from 'antd';
import { getReviewTag, IReviewTag } from '../constants/ReviewTags';
import useHttp from '../hooks/useHttp.hook';
import { APIPath } from '../../../src/APIPath';
import FormForm from './FormForm';

const { Content } = Layout;

interface StateProps {
  forms: IForm[];
}

interface DispatchProps {
  loadForms: (forms: IForm[]) => LoadFormsAction;
  createForm: (form: IForm) => CreateFormAction;
}

type Props = StateProps & DispatchProps;

const mapStateToProps: (state: RootState) => StateProps = (state: RootState) => ({
  forms: state.forms.forms,
});

const dispatchProps: DispatchProps = {
  createForm,
  loadForms,
};

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
    ),
  },
];


const QuestionForm: React.FC<Props> = (props) => {

  const { loadForms, createForm, forms } = props;

  const { request, loading } = useHttp();

  useEffect(() => {
    request<{ forms: IForm[] }>(APIPath.form)
      .then(res => {
        loadForms(res.forms);
      });
  }, [loadForms, request]);

  const data = forms.map((form, index) => {
    return {
      number: (index + 1).toString(),
      key: index.toString(),
      name: form.description,
      date: 'Еще нет',
      tags: [form.type].map(getReviewTag),
    };
  });

  const [openAddForm, setOpenAddForm] = useState(false);

  const onSave = (form: IForm) => {
    request<{ form: IForm }>(APIPath.form, 'PUT', form)
      .then(res => {
        createForm(res.form);
        setOpenAddForm(false);
      });
  };

  return (
    <div
      style={{
        padding: '30px',
      }}
    >
      {openAddForm ? <FormForm onCancel={() => setOpenAddForm(false)} onOk={onSave} />
        :
        <>
          <Typography.Title
            style={{
              fontSize: '35px',
            }}
          >
            Анкеты
          </Typography.Title>
          <Content className="table-wrapper"  style={{
            borderRadius: 3,
            marginBottom: 24,
            minHeight: 450,
            backgroundColor: 'white',
          }}>
            <CustomTable loading={loading} columns={columns} dataSource={data} />
          </Content>
          <Button
            type={'primary'}
            style={{
              width: '30%',
              backgroundColor: '#273241',
              borderColor: '#273241',
              fontWeight: 'bold',
            }}
            onClick={() => setOpenAddForm(true)}
          >
            Добавить
          </Button>
        </>
      }
    </div>
  );
};

export default connect<StateProps, DispatchProps>(mapStateToProps, dispatchProps)(QuestionForm);
