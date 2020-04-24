import React, { PureComponent } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { connect } from 'dva'

const { Option } = Select;

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

  getseleteData = () => {
    const { seleteData } = this.props.formcreate;
    const children = [];
    for (let i = 0; i < seleteData.length; i++) {
      children.push(<Option key={seleteData[i]}>{seleteData[i]}</Option>)
    }
    return children
  }


  handleOk = () => {
    const { formcreatedata, seleteData } = this.props.formcreate;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = values
        data.type = 'Select'
        let newvalues = []
        newvalues = data.value.split('，')
         data.value = newvalues
        data.dataIndex = data.title
        data.key = data.title
        data.children = []
        const formdata = { data, formcreatedata, seleteData }
        const { dispatch } = this.props;
        dispatch({
          type: 'formcreate/savedatafetch',
          payload: formdata,
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
        <Form.Item label="选择数据集">
          {getFieldDecorator('aggregate', {
            rules: [{ required: true, message: '请选择该表单项所属集合' }],
          })(
            <Select style={{ width: '100%' }} tokenSeparators={[',']}>
              {this.getseleteData()}
            </Select>,
          )}
         </Form.Item>
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
