import React, { useState, useEffect, Fragment } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.less';

export default function NormalDatePicker(props) {
  const { form, name, options = {}, format = 'YYYY-MM-DD HH:mm:ss', ...others } = props;
  const { getFieldDecorator, setFieldsValue } = form;
  const initialDate = options.initialValue || moment();
  const [date, setDate] = useState(initialDate);
  getFieldDecorator(name, options);

  function onChange(d) {
    setDate(d);
  }

  useEffect(() => {
    setFieldsValue({
      [name]: date ? date.format(format) : null,
    });
  }, [date]);

  return (
    <Fragment>
      <DatePicker
        className={styles.normalDate}
        showTime
        placeholder="Select Time"
        value={date}
        onChange={onChange}
        format={format}
        {...others}
      />
    </Fragment>
  );
}
