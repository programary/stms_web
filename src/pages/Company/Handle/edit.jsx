import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Card, Button, Select, message } from 'antd';
import TrimInput from '@/components/TrimInput';
// import NormalDatePicker from '@/components/NormalDatePicker';
import { COMPANYNAME, COMPANYTYPE } from '../constants';

const FormItem = Form.Item;
const { Option } = Select;

@connect(
  ({
    handleCompany: { detailMap },
    loading: {
      effects: { 'handleCompany/modify': confirmLoading, 'handleCompany/queryDetail': loading },
    },
  }) => ({
    detailMap,
    confirmLoading,
    loading,
  }),
)
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
      type: 'handleCompany/queryDetail',
      payload: {
        id,
      },
    });
  };

  handleSubmit = e => {
    e && e.preventDefault();

    const {
      form: { validateFields, resetFields },
      match: {
        params: { id },
      },
      dispatch,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        dispatch({
          type: 'handleCompany/modify',
          payload: {
            id,
            ...values,
          },
        }).then(() => {
          message.success('编辑成功!');
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
    const { getFieldDecorator, getFieldError } = form;
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
              router.push('/company/handle/list');
            }}
          >
            返回列表
          </Button>
        }
      >
        <Form>
          <FormItem {...formItemLayout} label="企业名称">
            {getFieldDecorator('companyName', {
              initialValue: detail ? detail.companyName : '',
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
              initialValue: detail ? detail.address : '',
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
              initialValue: detail ? detail.phone : '',
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
              initialValue: detail ? detail.inventory : '',
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
              initialValue: detail ? detail.contact : '',
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
              initialValue: detail ? detail.properties : '',
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
              initialValue: detail ? detail.concurrentVersion : '',
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
              initialValue: detail ? detail.dataVersion : '',
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
              initialValue: detail ? detail.type : COMPANYTYPE.HANDLE,
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
            <Button type="primary" onClick={this.handleSubmit} loading={confirmLoading}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}
