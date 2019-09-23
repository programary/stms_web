import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Card, Button, message } from 'antd';
import TrimInput from '@/components/TrimInput';
import NormalDatePicker from '@/components/NormalDatePicker';

const FormItem = Form.Item;

@connect(({ transport, loading: { effects: { 'transport/add': loading } } }) => ({
  transport,
  loading,
}))
@Form.create({})
export default class TransportAdd extends PureComponent {
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
          type: 'transport/add',
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
        title="运输管理-新增"
        extra={
          <Button
            type="primary"
            onClick={e => {
              e.preventDefault();
              router.push('/transport/list');
            }}
          >
            返回列表
          </Button>
        }
      >
        <Form>
          <FormItem {...formItemLayout} label="公司">
            {getFieldDecorator('companyId', {
              rules: [
                {
                  required: true,
                  message: '公司必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="运输时间"
            validateStatus={getFieldError('transTime') ? 'error' : 'success'}
            help={getFieldError('transTime') || undefined}
            required
          >
            <NormalDatePicker
              form={form}
              name="transTime"
              options={{
                rules: [
                  {
                    required: true,
                    message: '运输时间必填!',
                  },
                ],
              }}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="运输重量">
            {getFieldDecorator('weight', {
              rules: [
                {
                  required: true,
                  message: '运输重量必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="垃圾代码">
            {getFieldDecorator('trushCode', {
              rules: [
                {
                  required: true,
                  message: '垃圾代码必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="处置单价">
            {getFieldDecorator('disposeUnitPrice', {
              rules: [
                {
                  required: true,
                  message: '处置单价必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="处置总价">
            {getFieldDecorator('disposeTotalPrice', {
              rules: [
                {
                  required: true,
                  message: '处置总价必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="服务单价">
            {getFieldDecorator('serviceUnitPrice', {
              rules: [
                {
                  required: true,
                  message: '服务单价必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="服务总价">
            {getFieldDecorator('serviceTotalPrice', {
              rules: [
                {
                  required: true,
                  message: '服务总价必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="处置支付金额">
            {getFieldDecorator('disposePaidPrice', {
              rules: [
                {
                  required: true,
                  message: '处置支付金额必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="服务费支付金额">
            {getFieldDecorator('servicePaidPrice', {
              rules: [
                {
                  required: true,
                  message: '服务费支付金额必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="是否开具发票">
            {getFieldDecorator('invoice', {
              rules: [
                {
                  required: true,
                  message: '是否开具发票必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('comment', {
              rules: [
                {
                  required: true,
                  message: '备注必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="扩展字段">
            {getFieldDecorator('properties', {
              rules: [
                {
                  required: true,
                  message: '扩展字段必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="并发版本号">
            {getFieldDecorator('concurrentVersion', {
              rules: [
                {
                  required: true,
                  message: '并发版本号必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="数据版本号">
            {getFieldDecorator('dataVersion', {
              rules: [
                {
                  required: true,
                  message: '数据版本号必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="处置公司">
            {getFieldDecorator('disposeCompanyId', {
              rules: [
                {
                  required: true,
                  message: '处置公司必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="发运人">
            {getFieldDecorator('operator', {
              rules: [
                {
                  required: true,
                  message: '发运人必填!',
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
