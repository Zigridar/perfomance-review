import {Table} from 'antd';
import React, {useState} from 'react';
import { IReviewTag } from '../constants/ReviewTags';
import {connect} from 'react-redux';
import {APIPath} from '../../../src/APIPath';

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
  themes: Array<IReviewTag>,
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
        loading={false}
        dataSource={props.dataSource}
        pagination={false}
        columns={props.columns}
        // selection={{
        //   ...props.selection,
        //   type: 'checkbox',
        // }}
      />
    </>
  );
};

export default CustomTable;
