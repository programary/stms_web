import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Card, Button, Select, message } from 'antd';
import TrimInput from '@/components/TrimInput';
// import NormalDatePicker from '@/components/NormalDatePicker';
import { COMPANYNAME, COMPANYTYPE } from '../constants';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ produceCompany, loading: { effects: { 'produceCompany/add': loading } } }) => ({
  produceCompany,
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
          type: 'produceCompany/add',
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
        title="生产企业-新增"
        extra={
          <Button
            type="primary"
            onClick={e => {
              e.preventDefault();
              router.push('/company/produce/list');
            }}
          >
            返回列表
          </Button>
        }
      >
        <Form>
          <FormItem {...formItemLayout} label="企业名称">
            {getFieldDecorator('companyName', {
              rules: [
                {
                  required: true,
                  message: '企业名称必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="企业地址">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: '企业地址必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="企业联系方式">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: '企业联系方式必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="库存">
            {getFieldDecorator('inventory', {
              rules: [
                {
                  required: true,
                  message: '库存必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="联系人">
            {getFieldDecorator('contact', {
              rules: [
                {
                  required: true,
                  message: '联系人必填!',
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
          <FormItem {...formItemLayout} label="企业类型">
            {getFieldDecorator('type', {
              initialValue: COMPANYTYPE.PRODUCE,
              rules: [
                {
                  required: true,
                  message: '企业类型必填!',
                },
              ],
            })(
              <Select disabled style={{ width: 200 }}>
                {Object.keys(COMPANYNAME).map(key => (
                  <Option key={key} value={+key}>{COMPANYNAME[key]}</Option>
                ))}
              </Select>,
            )}
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
