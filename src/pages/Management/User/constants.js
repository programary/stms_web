import React from 'react';
import Link from 'umi/link';
import { message, Modal } from 'antd';

const { confirm } = Modal;

export const renderColumns = (props, ctx) => {
  const { dispatch } = props;
  const { handleSubmit } = ctx;
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
      key: 'goToDetail',
      dataIndex: 'goToDetail',
      fixed: 'right',
      width: 50,
      render: (_, record) => <Link to={`/management/user/edit/${record.id}`}>详情</Link>,
    },
    {
      key: 'deleteItem',
      dataIndex: 'deleteItem',
      fixed: 'right',
      width: 50,
      render: (_, record) => (
        <a
          onClick={e => {
            e.preventDefault();
            confirm({
              title: '删除',
              content: '是否确认删除?',
              onOk: () => {
                dispatch({
                  type: 'managementUser/remove',
                  payload: {
                    id: record.id,
                  },
                }).then(() => {
                  message.success('删除成功!');
                  handleSubmit();
                });
              },
            });
          }}
        >
          删除
        </a>
      ),
    },
  ];
  return columns;
};
