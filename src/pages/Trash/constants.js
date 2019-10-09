import React from 'react';
import { message, Modal } from 'antd';

const { confirm } = Modal;

export const renderColumns = (props, ctx) => {
  const { dispatch } = props;
  const { handleSubmit } = ctx;
  const columns = [
    {
      title: '废品代码',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: '废品名称',
      key: 'name',
      dataIndex: 'name',
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
                  type: 'trash/remove',
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
}
