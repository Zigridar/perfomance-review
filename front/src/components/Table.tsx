import {Table} from 'antd';
import React from 'react';
import {IReviewTag} from '../constants/ReviewTags';

interface ColumnProps {
  dataIndex: string;
  width: string;
  title: string;
}

interface DataSourceProps {
  key: string;
  number: string;
  name: string;
  date: string;
  tags: Array<IReviewTag>,
}

/** Own table props */
interface OwnProps {
  loading: boolean;
  dataSource: Array<DataSourceProps>;
  columns: Array<ColumnProps>;
  selection?: {
    onChange: Function;
    getCheckboxProps: Function;
  };
}

const CustomTable: React.FC<OwnProps> = (props: OwnProps) => {

  return (
    <>
      <Table
        scroll={{
          y: 500,
          scrollToFirstRowOnChange: false
        }}
        loading={props.loading}
        dataSource={props.dataSource}
        pagination={false}
        columns={props.columns}
      />
    </>
  );
};

export default CustomTable;
