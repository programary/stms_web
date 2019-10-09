import React from 'react';
import { Table } from 'antd';

export default function NormalTable(props) {
  const {
    defaultCurrent = 1,
    total = 0,
    pageSize = 10,
    onChange = () => {},
    pagination = {},
    rowSelection = null,
    data = [],
    columns = [],
    loading = false,
  } = props;
  const paginationOptions = {
    defaultCurrent,
    total,
    pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    onShowSizeChange: (cur, pSize) => {
      if (onChange && typeof onChange === 'function') {
        onChange((cur - 1) * pSize, pSize);
      }
    },
    onChange: (cur, pSize) => {
      if (onChange && typeof onChange === 'function') {
        onChange((cur - 1) * pSize, pSize);
      }
    },
    showTotal: (tot, range) => `展示第${range[0]}至${range[1]}条数据，共${tot}条数据`,
    ...pagination,
  };

  return (
    <Table
      size="small"
      pagination={{ ...paginationOptions }}
      dataSource={data}
      columns={columns}
      rowKey={(record, index) => index}
      loading={loading}
      rowSelection={rowSelection}
      {...props}
    />
  );
}
