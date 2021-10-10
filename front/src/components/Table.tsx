import {Table, CheckboxProps} from 'antd';
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
  key: React.Key;
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
    onChange?: (selectedRowKeys: React.Key[], selectedRows: DataSourceProps[]) => void,
    getCheckboxProps?: (record: DataSourceProps) => Partial<Omit<CheckboxProps, "checked" | "defaultChecked">>,
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
        rowSelection={props.selection && {
          ...props.selection,
          type: 'checkbox',
        }}
      />
    </>
  );
};

export default CustomTable;
