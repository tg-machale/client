import React, { PureComponent } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { connect } from 'dva'

@connect(({ formcreate, loading }) => ({
  formcreate,
  loading,
}))
class NormalSelectForm extends PureComponent {
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
        data.type = 'Select'
        let newvalues = []
        newvalues = data.value.split('，')
        data.value = newvalues
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
         选择器
        </Button>
        <Modal
          title="请填写该表单项具体信息"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <Form onSubmit={this.handleSubmit} className="select-form" >
         <Form.Item label="名字">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入该输入框的名字' }],
          })(
            <Input
              placeholder="title"
            />,
          )}
         </Form.Item>
         <Form.Item label="选项（多个选项以逗号隔开）">
          {getFieldDecorator('value', {
            rules: [{ required: true, message: '请输入该输入框的名字' }],
          })(
            <Input
              placeholder="value"
            />,
          )}
         </Form.Item>
        </Form>
        </Modal>
      </div>
    );
  }
}

const selectmodal = Form.create({ name: 'select-form' })(NormalSelectForm);
export default selectmodal
