import React from 'react';
import Link from 'umi/link';
import { message, Modal } from 'antd';

const { confirm } = Modal;

export const COMPANYTYPE = {
  HANDLE: '1',
  PRODUCE: '2',
};

export const COMPANYNAME = {
  [COMPANYTYPE.HANDLE]: '处置企业',
  [COMPANYTYPE.PRODUCE]: '生产企业',
};

export const COMPANYURLPATH = {
  [COMPANYTYPE.HANDLE]: 'handle',
  [COMPANYTYPE.PRODUCE]: 'produce',
};

export const renderColumns = (props, ctx) => {
  const { dispatch } = props;
  const { handleSubmit } = ctx;
  const columns = [
    // {
    //   title: '企业ID',
    //   key: 'id',
    //   dataIndex: 'id',
    // },
    {
      title: '企业名称',
      key: 'companyName',
      dataIndex: 'companyName',
    },
    {
      title: '企业地址',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: '企业联系方式',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '库存',
      key: 'inventory',
      dataIndex: 'inventory',
    },
    {
      title: '联系人',
      key: 'contact',
      dataIndex: 'contact',
    },
    {
      title: '扩展字段',
      key: 'properties',
      dataIndex: 'properties',
    },
    {
      title: '并发版本号',
      key: 'concurrentVersion',
      dataIndex: 'concurrentVersion',
    },
    {
      title: '数据版本号',
      key: 'dataVersion',
      dataIndex: 'dataVersion',
    },
    {
      title: '企业类型',
      key: 'type',
      dataIndex: 'type',
      render: t => COMPANYNAME[t],
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
    },
    {
      key: 'goToDetail',
      dataIndex: 'goToDetail',
      fixed: 'right',
      width: 50,
      render: (_, record) => <Link to={`/company/${COMPANYURLPATH[record.type]}/edit/${record.id}`}>详情</Link>,
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
                  type: `${COMPANYURLPATH[record.type]}Company/remove`,
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
