import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal, Upload, List, Button, message } from 'antd';

const ListItem = List.Item;

@connect(({
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
}))
export default class AttachmentModal extends PureComponent {
  componentDidMount() {
    this.queryAttach();
  }

  queryAttach = () => {
    const { data: { id }, dispatch } = this.props;

    dispatch({
      type: 'attachment/queryAttach',
      payload: {
        id,
      },
    });
  }

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
        }).then(() => {
          message.success('上传成功!');
          this.queryAttach();
        }).catch(e => {
          message.error(e.message);
        });
      },
    };

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
        <Upload {...uploadProps}>
          <Button icon="upload" loading={uploadAttachLoading}>附件上传</Button>
        </Upload>
        {lists && lists.length > 0 && (
          <List
            loading={loading}
            dataSource={lists}
            renderItem={i => <ListItem><a href={i.url} target="_blank" rel="noopener noreferrer">{i.name}</a></ListItem>}
          />
        )}
      </Modal>
    );
  }
}
