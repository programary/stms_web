import React from 'react';
import moment from 'moment';
import Link from 'umi/link';
import { message, Modal } from 'antd';

const { confirm } = Modal;

export const format = 'YYYY-MM-DD HH:mm:ss';

export const renderColumns = (props, ctx) => {
  const { dispatch } = props;
  const { handleSubmit } = ctx;
  const columns = [
    {
      title: '生产公司',
      key: 'produceCompanyName',
      dataIndex: 'produceCompanyName',
    },
    {
      title: '运输时间',
      key: 'transTime',
      dataIndex: 'transTime',
      render: t => moment(t).format(format),
    },
    {
      title: '运输重量',
      key: 'weight',
      dataIndex: 'weight',
    },
    {
      title: '垃圾代码',
      key: 'trushCode',
      dataIndex: 'trushCode',
    },
    {
      title: '处置单价',
      key: 'disposeUnitPrice',
      dataIndex: 'disposeUnitPrice',
    },
    {
      title: '处置总价',
      key: 'disposeTotalPrice',
      dataIndex: 'disposeTotalPrice',
    },
    {
      title: '服务单价',
      key: 'serviceUnitPrice',
      dataIndex: 'serviceUnitPrice',
    },
    {
      title: '服务总价',
      key: 'serviceTotalPrice',
      dataIndex: 'serviceTotalPrice',
    },
    {
      title: '处置支付金额',
      key: 'disposePaidPrice',
      dataIndex: 'disposePaidPrice',
    },
    {
      title: '服务费支付金额',
      key: 'servicePaidPrice',
      dataIndex: 'servicePaidPrice',
    },
    {
      title: '是否开具发票',
      key: 'invoice',
      dataIndex: 'invoice',
    },
    {
      title: '备注',
      key: 'comment',
      dataIndex: 'comment',
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
      title: '处置公司',
      key: 'disposeCompanyName',
      dataIndex: 'disposeCompanyName',
    },
    {
      title: '发运人',
      key: 'operator',
      dataIndex: 'operator',
    },
    {
      title: '修改时间',
      key: 'modofiedTime',
      dataIndex: 'modofiedTime',
    },
    {
      title: '创建时间',
      key: 'createdTime',
      dataIndex: 'createdTime',
    },
    {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
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
      render: (_, record) => <Link to={`/transport/edit/${record.id}`}>详情</Link>,
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
                  type: 'transport/remove',
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
