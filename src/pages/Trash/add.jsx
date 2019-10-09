import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Card, Button, message } from 'antd';
import TrimInput from '@/components/TrimInput';
import NormalDatePicker from '@/components/NormalDatePicker';

const FormItem = Form.Item;

@connect(({ trash, loading: { effects: { 'trash/add': loading } } }) => ({
  trash,
  loading,
}))
@Form.create({})
export default class TrashAdd extends PureComponent {
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
          type: 'trash/add',
          payload: values,
        }).then(() => {
          message.success('添加成功!');
          resetFields();
          // window.location.reload();
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
        title="废品管理-新增"
        extra={
          <Button
            type="primary"
            onClick={e => {
              e.preventDefault();
              router.push('/trash/list');
            }}
          >
            返回列表
          </Button>
        }
      >
        <Form>
          <FormItem {...formItemLayout} label="废品代码">
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message: '废品代码必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="废品名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '废品名称必填!',
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
