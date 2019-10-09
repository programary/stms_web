import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Card, Row, Col, Button, message } from 'antd';
import NormalTable from '@/components/NormalTable';
import { renderColumns } from '../constants';
import AttachmentModal from '../Modal/AttachmentModal';
import CompanyProduceForm from './form';
import { jsonReplacer } from '@/utils/tools';
import styles from './index.less';

@connect(({
  produceCompany: { lists },
  loading: {
    effects: { 'produceCompany/queryList': loading },
  },
}) => ({
  lists,
  loading,
}))
export default class CompanyProduce extends PureComponent {
  state = {
    fields: {
      pageNum: 0,
      pageSize: 20,
      companyName: '',
    },
    modal: {
      attach: {
        show: false,
        data: null,
      },
    },
  };

  componentDidMount() {
    this.handleSubmit();
  }

  handleModalActive = ({ name, opt = {} }) => {
    this.setState(({ modal }) => ({
      modal: {
        ...modal,
        [name]: opt,
      },
    }));
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
      type: 'produceCompany/queryList',
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
      <Fragment>
        <Card
          bordered={false}
          title="生产企业"
          extra={
            <Button
              icon="plus"
              type="primary"
              onClick={e => {
                e.preventDefault();
                router.push('/company/produce/add');
              }}
            >
              添加
            </Button>
          }
        >
          <Row className={styles.produceCompanyRow}>
            <Col span={24}>
              <CompanyProduceForm
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
          <Row className={styles.produceCompanyRow}>
            <Col span={24}>
              <NormalTable {...setting} />
            </Col>
          </Row>
        </Card>
        {modal.attach.data && (
          <AttachmentModal
            show={modal.attach.show}
            data={modal.attach.data}
            onOk={data => {
              this.handleSubmit();
            }}
            onCancel={() => {
              this.handleModalActive({
                name: 'attach',
                opt: {
                  show: false,
                  data: null,
                },
              });
              this.handleSubmit();
            }}
          />
        )}
      </Fragment>
    );
  }
}
