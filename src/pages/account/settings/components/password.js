import React, { PureComponent } from 'react';
import { Modal, Form, Icon, Input, message } from 'antd';
import { connect } from 'dva'
import { routerRedux } from 'dva/router'


@connect(({ user, accountAndsettings, loading }) => ({
    accountAndsettings,
    user,
    loading,
}))
class NormalPasswordForm extends PureComponent {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
      const { name } = this.props.user.currentUser
      const { updatePasswordStatus } = this.props.accountAndsettings
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.name = name
        const { dispatch } = this.props
        dispatch({
          type: 'accountAndsettings/updataPassword',
          payload: values,
        });
        this.props.form.resetFields()
        if (updatePasswordStatus.payload.code === 0) {
            message.success(updatePasswordStatus.payload.msg);
            setTimeout(() => {
                console.log('aaa')
                dispatch(routerRedux.push('/'))
              }, 1000)
          } else if (updatePasswordStatus.payload.code === 1 || updatePasswordStatus.payload.code === 2) {
            message.error(updatePasswordStatus.payload.msg);
          }
      }
    });
      this.setState({
        visible: false,
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <a key="Modify" onClick={this.showModal}>
          修改
        </a>
        <Modal
          title="密码修改"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         <Form onSubmit={this.handleSubmit} className="password-form" >
         <Form.Item label="旧密码">
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: '请输入旧密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="旧密码"
              type="password"
            />,
          )}
         </Form.Item>
         <Form.Item label="新密码">
          {getFieldDecorator('newPassword', {
            rules: [{ required: true, message: '请输入新密码' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="新密码"
              type="password"
            />,
          )}
         </Form.Item>
        </Form>
        </Modal>
      </div>
    );
  }
}

const passwordmodal = Form.create({ name: 'password-form' })(NormalPasswordForm);
export default passwordmodal
