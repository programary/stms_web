import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Card, Button, message } from 'antd';
import TrimInput from '@/components/TrimInput';
// import NormalDatePicker from '@/components/NormalDatePicker';
// import { COMPANYNAME, COMPANYTYPE } from '../constants';

const FormItem = Form.Item;

@connect(({
  managementUser: { detailMap },
  loading: {
    effects: { 'managementUser/modify': confirmLoading, 'managementUser/queryDetail': loading },
  },
}) => ({
  detailMap,
  loading,
  confirmLoading,
}))
@Form.create({})
export default class CompanyHandleEdit extends PureComponent {
  componentDidMount() {
    this.queryDetail();
  }

  queryDetail = () => {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    dispatch({
      type: 'managementUser/queryDetail',
      payload: {
        id,
      },
    });
  };

  handleSubmit = e => {
    e && e.preventDefault();

    const {
      form: { validateFields, resetFields },
      dispatch,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'managementUser/modify',
          payload: values,
        }).then(() => {
          message.success('修改成功!');
          window.location.reload();
        });
      }
    });
  };

  render() {
    const {
      form,
      detailMap,
      loading,
      confirmLoading,
      match: {
        params: { id },
      },
    } = this.props;
    const { getFieldDecorator } = form;
    const detail = detailMap[id];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      style: {
        width: 800,
      },
    };

    return (
      <Card
        loading={loading}
        bordered={false}
        title="处置企业-编辑"
        extra={
          <Button
            type="primary"
            onClick={e => {
              e.preventDefault();
              router.push('/management/user/list');
            }}
          >
            返回列表
          </Button>
        }
      >
        <Form>
          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('userName', {
              initialValue: detail ? detail.userName : '',
              rules: [
                {
                  required: true,
                  message: '用户名必填!',
                },
              ],
            })(<TrimInput disabled />)}
          </FormItem>
          <FormItem {...formItemLayout} label="用户密码">
            {getFieldDecorator('userPassword', {
              initialValue: detail ? detail.userPassword : '',
              rules: [
                {
                  required: true,
                  message: '用户密码必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="电话">
            {getFieldDecorator('phone', {
              initialValue: detail ? detail.phone : '',
              rules: [
                {
                  required: true,
                  message: '电话必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<Fragment />} colon={false}>
            <Button type="primary" onClick={this.handleSubmit} loading={confirmLoading}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
