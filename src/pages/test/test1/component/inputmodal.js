import React, { PureComponent } from 'react';
import { Modal, Button, Form, Icon, Input } from 'antd';
import { connect } from 'dva'


@connect(({ formcreate, loading }) => ({
  formcreate,
  loading,
}))
class NormalInputForm extends PureComponent {
  state = {
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { formcreatedata } = this.props.formcreate;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = values
        data.type = 'Input'
        data.id = formcreatedata.length + 1
        const { dispatch } = this.props;
        dispatch({
          type: 'formcreate/saveformcreatedata',
          payload: data,
        })
      }
    });
    this.setState({
      confirmLoading: true,
    });
      this.setState({
        visible: false,
        confirmLoading: false,
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 20 }} block>
         输入框
        </Button>
        <Modal
          title="请填写该表单项具体信息"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <Form onSubmit={this.handleSubmit} className="input-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
         <Form.Item label="名字">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入该输入框的名字' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="title"
            />,
          )}
         </Form.Item>
        </Form>
        </Modal>
      </div>
    );
  }
}

const inputmodal = Form.create({ name: 'input-form' })(NormalInputForm);
export default inputmodal
