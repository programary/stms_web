import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Card, Button, Select, Spin, message } from 'antd';
import moment from 'moment';
import TrimInput from '@/components/TrimInput';
import NormalDatePicker from '@/components/NormalDatePicker';

const FormItem = Form.Item;
const { Option } = Select;

@connect(
  ({
    transport: { detailMap },
    trash: { lists: trash },
    produceCompany: { lists: produce },
    handleCompany: { lists: handle },
    loading: {
      effects: { 'transport/modify': confirmLoading, 'transport/queryDetail': loading },
    },
  }) => ({
    detailMap,
    trash,
    produce,
    handle,
    loading,
    confirmLoading,
  }),
)
@Form.create({})
export default class TransportEdit extends PureComponent {
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
      type: 'transport/queryDetail',
      payload: {
        id,
      },
    });
  };

  handleSubmit = e => {
    e && e.preventDefault();

    const {
      form: { validateFields },
      dispatch,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'transport/modify',
          payload: values,
        }).then(() => {
          message.success('修改成功!');
          window.location.reload();
        });
      }
    });
  };

  renderSelect = name => {
    const {
      trash: { result: trashLists = [] },
      produce: { result: produceLists = [] },
      handle: { result: handleLists = [] },
    } = this.props;
    const mapping = {
      trash: {
        lists: trashLists,
        label: 'name',
        value: 'code',
      },
      produce: {
        lists: produceLists,
        label: 'companyName',
        value: 'id',
      },
      handle: {
        lists: handleLists,
        label: 'companyName',
        value: 'id',
      },
    };

    return mapping[name] && mapping[name].lists.length > 0 ? (
      <Select
        showSearch
        className="normalSelect"
        optionFilterProp="children"
        filterOption={(input, option) =>
          `${option.props.children}`.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
          `${option.props.value}`.indexOf(input) >= 0
        }
      >
        {mapping[name].lists.map(list => (
          <Option key={list[mapping[name].value]} value={list[mapping[name].value]}>
            {list[mapping[name].label]}
          </Option>
        ))}
      </Select>
    ) : (
      <Spin />
    );
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
        title="运输管理-编辑"
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
          <FormItem {...formItemLayout} label="生产公司">
            {getFieldDecorator('produceCompanyId', {
              initialValue: detail ? detail.produceCompanyId : '',
              rules: [
                {
                  required: true,
                  message: '生产公司必填!',
                },
              ],
            })(this.renderSelect('produce'))}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="运输时间"
            validateStatus={getFieldError('transTime') ? 'error' : 'success'}
            help={getFieldError('transTime') || undefined}
            required
          >
            {detail && (
              <NormalDatePicker
                form={form}
                name="transTime"
                options={{
                  initialValue: moment(detail.transTime),
                  rules: [
                    {
                      required: true,
                      message: '运输时间必填!',
                    },
                  ],
                }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="运输重量">
            {getFieldDecorator('weight', {
              initialValue: detail ? detail.weight : '',
              rules: [
                {
                  required: true,
                  message: '运输重量必填!',
                },
              ],
            })(<TrimInput />)}
          </FormItem>
          <FormItem {...formItemLayout} label="垃圾代码">
            {getFieldDecorator('trashCode', {
              initialValue: detail ? detail.trashCode : '',
              rules: [
                {
                  required: true,
                  message: '垃圾代码必填!',
                },
              ],
            })(this.renderSelect('trash'))}
          </FormItem>
          <FormItem {...formItemLayout} label="处置单价">
            {getFieldDecorator('disposeUnitPrice', {
              initialValue: detail ? detail.disposeUnitPrice : '',
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
              initialValue: detail ? detail.disposeTotalPrice : '',
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
              initialValue: detail ? detail.serviceUnitPrice : '',
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
              initialValue: detail ? detail.serviceTotalPrice : '',
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
              initialValue: detail ? detail.disposePaidPrice : '',
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
              initialValue: detail ? detail.servicePaidPrice : '',
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
              initialValue: detail ? detail.invoice : '',
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
              initialValue: detail ? detail.comment : '',
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
          <FormItem {...formItemLayout} label="处置公司">
            {getFieldDecorator('disposeCompanyId', {
              initialValue: detail ? detail.disposeCompanyId : '',
              rules: [
                {
                  required: true,
                  message: '处置公司必填!',
                },
              ],
            })(this.renderSelect('handle'))}
          </FormItem>
          <FormItem {...formItemLayout} label="发运人">
            {getFieldDecorator('operator', {
              initialValue: detail ? detail.operator : '',
              rules: [
                {
                  required: true,
                  message: '发运人必填!',
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
