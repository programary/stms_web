import React from 'react';
import moment from 'moment';

export const format = 'YYYY-MM-DD HH:mm:ss';

export const renderColumns = (props, ctx) => {
  // const { dispatch } = props;
  const columns = [
    {
      title: '公司ID',
      key: 'companyId',
      dataIndex: 'companyId',
    },
    {
      title: '运输时间',
      key: 'transTime',
      dataIndex: 'transTime',
      render: t => moment(t).format(format),
    },
    {
      title: '权重',
      key: 'weight',
      dataIndex: 'weight',
    },
    {
      title: '垃圾编号',
      key: 'trushCode',
      dataIndex: 'trushCode',
    },
  ];
  return columns;
};
