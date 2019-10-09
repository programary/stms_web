import React, { PureComponent } from 'react';
import { Input } from 'antd';
import styles from './index.less';

export default class TrimInput extends PureComponent {
  static defaultProps = {
    onChange: () => {},
    onBlur: () => {},
  };

  render() {
    return (
      <Input
        className={styles.normalInput}
        {...this.props}
        onBlur={e => {
          e.target.value = (e.target.value || '').trim();
          this.props.onChange(e);
          this.props.onBlur(e);
        }}
      />
    );
  }
}
