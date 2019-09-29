import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Row, Col, Button, message } from 'antd';
import NormalTable from '@/components/NormalTable';
import ManagementUserForm from './form';
import { renderColumns } from './constants';
import { jsonReplacer } from '@/utils/tools';
import styles from './index.less';

@connect(({
  managementUser: { lists },
  loading: {
    effects: { 'managementUser/queryList': loading },
  },
}) => ({
  lists,
  loading,
}))
export default class ManagementUser extends PureComponent {
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
      type: 'managementUser/queryList',
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
        x: 1800,
      },
    };

    return (
      <Card
        bordered={false}
        title="成员管理"
        extra={
          <Button
            icon="plus"
            type="primary"
            onClick={e => {
              e.preventDefault();
              router.push('/management/user/add');
            }}
          >
            添加
          </Button>
        }
      >
        <Row className={styles.managementUserRow}>
          <Col span={24}>
            <ManagementUserForm
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
        <Row className={styles.managementUserRow}>
          <Col span={24}>
            <NormalTable {...setting} />
          </Col>
        </Row>
      </Card>
    );
  }
}
