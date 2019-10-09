import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Row, Col, Button, message } from 'antd';
import NormalTable from '@/components/NormalTable';
import TransportForm from './form';
import { renderColumns } from './constants';
import { jsonReplacer } from '@/utils/tools';
import styles from './index.less';

@connect(({
  transport: { lists },
  loading: {
    effects: { 'transport/queryList': loading },
  },
}) => ({
  lists,
  loading,
}))
export default class Transport extends PureComponent {
  state = {
    fields: {
      operator: '',
      pageNum: 0,
      pageSize: 20,
    },
  };

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit = (params = {}) => {
    const { dispatch } = this.props;
    const { fields } = this.state;
    const formatParams = JSON.parse(
      JSON.stringify(
        {
          ...fields,
          ...params,
        },
        jsonReplacer,
      ),
    );

    dispatch({
      type: 'transport/queryList',
      payload: {
        ...formatParams,
      },
    }).catch(err => {
      message.error(err.message);
    });
  };

  render() {
    const { lists, loading } = this.props;
    const { fields, modal } = this.state;
    const { pageNum, pageSize } = fields;
    const setting = {
      loading,
      data: lists.result,
      total: lists.totalcount,
      columns: renderColumns(this.props, this),
      current: pageNum / pageSize + 1,
      pageSize,
      onChange: (start, length) => {
        if (this.pending) return;
        this.pending = true;
        this.setState(
          ({ fields: prevFields }) => ({
            fields: {
              ...prevFields,
              pageNum: start,
              pageSize: length,
            },
          }),
          () => {
            this.handleSubmit();
            this.pending = false;
          },
        );
      },
      scroll: {
        x: 3000,
      },
    };

    return (
      <Card
        bordered={false}
        title="运输管理"
        extra={
          <Button
            icon="plus"
            type="primary"
            onClick={e => {
              e.preventDefault();
              router.push('/transport/add');
            }}
          >
            添加
          </Button>
        }
      >
        <Row className={styles.transportRow}>
          <Col span={24}>
            <TransportForm
              onSubmit={data => {
                this.setState(
                  ({ fields: prevFields }) => ({
                    fields: {
                      ...prevFields,
                      ...data,
                    },
                  }),
                  () => {
                    this.handleSubmit();
                  },
                );
              }}
            />
          </Col>
        </Row>
        <Row className={styles.transportRow}>
          <Col span={24}>
            <NormalTable {...setting} />
          </Col>
        </Row>
      </Card>
    );
  }
}
