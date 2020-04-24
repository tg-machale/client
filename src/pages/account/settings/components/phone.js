import React, { PureComponent } from 'react';
import { Modal, Form, Icon, Input, message, Row, Col, Button } from 'antd';
import { connect } from 'dva'
import { routerRedux } from 'dva/router'


@connect(({ user, accountAndsettings, loading }) => ({
  accountAndsettings,
  user,
  loading,
}))
class NormalPhoneForm extends PureComponent {
  state = {
    visible: false,
    msg: '获取验证码',
    disable: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  BuClick = () => {
    const { name } = this.props.user.currentUser
    this.props.form.validateFields((err, values) => {
      if (values.newPhone !== undefined) {
        const { dispatch } = this.props
        dispatch({
          type: 'accountAndsettings/getcode',
          payload: name,
        });

        let i = 5
        this.setState({
          disable: true,
        });
        this.interval = window.setInterval(() => {
          i -= 1;
          this.setState({
            msg: `已发送(${i}S)`,
          });

          if (i === 0) {
            clearInterval(this.interval);
            this.setState({
              msg: '获取验证码',
              disable: false,
            });
          }
        }, 1000);
      }
    });
  }

  handleOk = () => {
    const { name } = this.props.user.currentUser
    const { updatePhoneStatus } = this.props.accountAndsettings
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.name = name
        const { dispatch } = this.props
        dispatch({
          type: 'accountAndsettings/updataphone',
          payload: values,
        });
        this.props.form.resetFields()
        if (updatePhoneStatus.payload.code === 0) {
          message.success(updatePhoneStatus.payload.msg);
        } else if (updatePhoneStatus.payload.code === 1 || updatePhoneStatus.payload.code === 2) {
          message.error(updatePhoneStatus.payload.msg);
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
    const { visible, msg, disable } = this.state;
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
          <Form onSubmit={this.handleSubmit} className="phone-form" >
            <Form.Item >
              {getFieldDecorator('newPhone', {
                rules: [{ required: true, message: '请输入新手机号码' }],
              })(
                <Input
                  prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="新手机号码"
                />,
              )}
            </Form.Item>
            <Row gutter={16}>
              <Col span={18}>
                <Form.Item >
                  {getFieldDecorator('captcha', {
                  })(
                    <Input
                      prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="验证码"
                    />,
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button type="dashed" onClick={this.BuClick} disable={disable.toString()}>{msg}</Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

const phonemodal = Form.create({ name: 'phone-form' })(NormalPhoneForm);
export default phonemodal
