import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.less';

const { RangePicker } = DatePicker;

export default function NormalDateRangePicker(props) {
  const {
    form,
    names: [n1, n2],
    format = 'YYYY-MM-DD HH:MM:ss',
    options: [opt1, opt2] = [{}, {}],
    ...others
  } = props;
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
  const now = moment();
  getFieldDecorator(n1, opt1);
  getFieldDecorator(n2, opt2);
  const startDate = getFieldValue(n1);
  const endDate = getFieldValue(n2);

  function onChange([start, end]) {
    setFieldsValue({
      [n1]: start ? start.format(format) : null,
      [n2]: end ? end.format(format) : null,
    });
  }

  return (
    <RangePicker
      {...others}
      className={styles.normalRangeDate}
      ranges={{
        昨天: [now.subtract(1, 'days').startOf('day'), now.subtract(1, 'days').endOf('day')],
        今天: [moment().startOf('day'), moment()],
        最近7日: [now.subtract(7, 'days').startOf('day'), now],
        最近30日: [now.subtract(30, 'days').startOf('day'), now],
      }}
      value={[
        startDate ? moment(startDate, format) : null,
        endDate ? moment(endDate, format) : null,
      ]}
      showTime
      format={format}
      onChange={onChange}
    />
  );
}
