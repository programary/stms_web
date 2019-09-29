import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Card, Button, Select, message } from 'antd';
import TrimInput from '@/components/TrimInput';
// import NormalDatePicker from '@/components/NormalDatePicker';
// import { COMPANYNAME, COMPANYTYPE } from '../constants';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ managementUser, loading: { effects: { 'managementUser/add': loading } } }) => ({
  managementUser,
  loading,
}))
@Form.create({})
export default class CompanyHandleAdd extends PureComponent {
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
          type: 'managementUser/add',
          payload: values,
        }).then(() => {
          message.success('添加成功!');
          resetFields();
        });
      }
    });
  };

  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator, getFieldError } = form;
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
        bordered={false}
        title="处置企业-新增"
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
              rules: [
                {
                  required: true,
                  message: '用户名必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="用户密码">
            {getFieldDecorator('userPassword', {
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
              rules: [
                {
                  required: true,
                  message: '电话必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<Fragment />} colon={false}>
            <Button type="primary" onClick={this.handleSubmit} loading={loading}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
