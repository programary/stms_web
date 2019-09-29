import React from 'react';
import Link from 'umi/link';

export const renderColumns = (props, ctx) => {
  // const { dispatch } = props;
  const columns = [
    {
      title: '用户名',
      key: 'userName',
      dataIndex: 'userName',
    },
    {
      title: '用户密码',
      key: 'userPassword',
      dataIndex: 'userPassword',
    },
    {
      title: '电话',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '修改人',
      key: 'operator',
      dataIndex: 'operator',
    },
    {
      title: '修改时间',
      key: 'modifiedTime',
      dataIndex: 'modifiedTime',
    },
    {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      key: 'createdTime',
      dataIndex: 'createdTime',
    },
    {
      key: 'operate',
      dataIndex: 'operate',
      fixed: 'right',
      width: 100,
      render: (_, record) => <Link to={`/management/user/edit/${record.id}`}>详情</Link>,
    },
  ];
  return columns;
};
