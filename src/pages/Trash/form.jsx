import React, { PureComponent } from 'react';
import { Form, Button } from 'antd';
import TrimInput from '@/components/TrimInput';

const FormItem = Form.Item;

@Form.create({})
export default class TrashForm extends PureComponent {
  handleReset = e => {
    e && e.preventDefault();
    const {
      form: { setFieldsValue },
      onSubmit,
    } = this.props;
    const params = {
      code: '',
      name: '',
    };

    setFieldsValue({
      ...params,
    });

    onSubmit({
      ...params,
      pageNum: 0,
    });
  };

  handleSubmit = e => {
    e && e.preventDefault();
    const {
      form: { validateFields },
      onSubmit,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        onSubmit({
          ...values,
          pageNum: 0,
        });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="inline">
        <FormItem label="废品代码">
          {getFieldDecorator('code', {
            initialValue: '',
          })(<TrimInput style={{ width: 200 }} />)}
        </FormItem>
        <FormItem label="废品名称">
          {getFieldDecorator('name', {
            initialValue: '',
          })(<TrimInput style={{ width: 200 }} />)}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={this.handleSubmit}>
            查询
          </Button>
          <Button type="primary" style={{ marginLeft: 15 }} onClick={this.handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}
