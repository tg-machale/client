import React, { PureComponent } from 'react';
import { Modal, Button, Form, Icon, Input, Select } from 'antd';
import { connect } from 'dva'


const { Option } = Select;

@connect(({ formcreate, loading }) => ({
  formcreate,
  loading,
}))
class NormalInputForm extends PureComponent {
  state = {
    visible: false,
    confirmLoading: false,
    value: undefined,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { formcreatedata, seleteData } = this.props.formcreate;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        const data = values
        data.type = 'Input'
        data.dataIndex = data.title
        data.key = data.title
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

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  getseleteData = () => {
    const { seleteData } = this.props.formcreate;
    const children = [];
    for (let i = 0; i < seleteData.length; i++) {
      children.push(<Option key={seleteData[i]}>{seleteData[i]}</Option>)
    }
    return children
  }

  render() {
    const { visible, confirmLoading, value } = this.state;
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
