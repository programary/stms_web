import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Row, Col, Button, message } from 'antd';
import NormalTable from '@/components/NormalTable';
import { renderColumns } from './constants';
import { jsonReplacer } from '@/utils/tools';

@connect(({ transport }) => ({ transport }))
export default class Transport extends PureComponent {
  state = {
    fields: {
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
    const {
      transport: { lists },
      loading,
    } = this.props;
    const { fields, modal } = this.state;
    const { pageNum, pageSize } = fields;
    const setting = {
      loading,
      data: lists.list,
      total: lists.count,
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
        <Row>
          <Col span={24}>
            <NormalTable {...setting} />
          </Col>
        </Row>
      </Card>
    );
  }
}
