import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Upload, List, Button, Spin, message } from 'antd';
import classNames from 'classnames';
import styles from './AttachmentModal.less';

const ListItem = List.Item;

@connect(
  ({
    attachment: { lists },
    loading: {
      effects: {
        'attachment/uploadAttach': uploadAttachLoading,
        'attachment/queryAttach': loading,
      },
    },
  }) => ({
    lists,
    loading,
    uploadAttachLoading,
  }),
)
export default class AttachmentModal extends PureComponent {
  componentDidMount() {
    this.queryAttach();
  }

  queryAttach = () => {
    const {
      data: { id },
      dispatch,
    } = this.props;

    dispatch({
      type: 'attachment/queryAttach',
      payload: {
        id,
      },
    });
  };

  removeAttach = id => {
    const { dispatch } = this.props;

    dispatch({
      type: 'attachment/removeAttach',
      payload: {
        id,
      },
    })
      .then(() => {
        message.success('删除成功!');
        this.queryAttach();
      })
      .catch(e => {
        message.error(e.message);
      });
  };

  render() {
    const {
      show,
      data: { id },
      dispatch,
      lists,
      uploadAttachLoading,
      loading,
      onOk,
      onCancel,
    } = this.props;
    const uploadProps = {
      showUploadList: false,
      customRequest: ({ file, filename }) => {
        const formData = new FormData();
        formData.append(filename, file);
        formData.append('id', id);
        dispatch({
          type: 'attachment/uploadAttach',
          payload: formData,
        })
          .then(() => {
            message.success('上传成功!');
            this.queryAttach();
          })
          .catch(e => {
            message.error(e.message);
          });
      },
    };
    const itemCls = classNames('clearfix', styles.attachItem);

    return (
      <Modal
        title="附件"
        destroyOnClose
        width={800}
        visible={show}
        onCancel={() => {
          onCancel();
        }}
        footer={null}
        // onOk={this.handleSubmit}
      >
        <Spin spinning={loading}>
          <Upload {...uploadProps}>
            <Button icon="upload" loading={uploadAttachLoading}>
              附件上传
            </Button>
          </Upload>
          {lists && lists.length > 0 && (
            <List
              loading={loading}
              dataSource={lists}
              renderItem={i => (
                <ListItem>
                  <div className={itemCls}>
                    <a className="pull-left" href={i.url} target="_blank" rel="noopener noreferrer">
                      {i.name}
                    </a>
                    <Button
                      className="pull-right"
                      size="small"
                      key="removeAttach"
                      onClick={e => {
                        e.preventDefault();
                        this.removeAttach(i.id);
                      }}
                    >
                      删除
                    </Button>
                  </div>
                </ListItem>
              )}
            />
          )}
        </Spin>
      </Modal>
    );
  }
}
