import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Card, Form, Input, Select, Button, Radio } from 'antd'
import { connect } from 'dva'
import App from './component'

@connect(({ formcreate, loading }) => ({
  formcreate,

  loading,
}))

 class NormalCreateForm extends PureComponent {
  handleSubmit = e => {
    const { formcreatedata } = this.props.formcreate;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          id: values.id,
          formcreatedata,
        }
        const { dispatch } = this.props;
        dispatch({
          type: 'formcreate/fetchForm',
          payload: data,
        });
      }
    });
  };

   renderCreateForm = (item, getFieldDecorator) => {
      if (item.type === 'Input') {
        return (
        <Form.Item label= {item.title} key={item.id}>
          {getFieldDecorator(`${item.title}`, {
          })(<Input />)}
        </Form.Item>
        )
      } if (item.type === 'Select') {
        return (
          <Form.Item label={item.title} key={item.id}>
          {getFieldDecorator(`${item.title}`, {
          })(
            <Select
              placeholder="请选择"
              onChange={this.handleSelectChange}
            >
              {item.value.map(value => (
                <Select.Option value={value} key>{value}</Select.Option>
              ))}
            </Select>,
          )}
        </Form.Item>
        )
      }
   }

  render() {
    const { formcreatedata } = this.props.formcreate;
    const { getFieldDecorator } = this.props.form;
    console.log(formcreatedata)
    return (
    <PageHeaderWrapper>
      <Card>
      <Form onSubmit={this.handleSubmit} className="create-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="项目id">
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '请填写项目id' }],
          })(
            <Input
              placeholder="项目id"
            />,
          )}
        </Form.Item>
        {formcreatedata.map(item => (
               this.renderCreateForm(item, getFieldDecorator)
        ))}
         <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
        </Form>
     <App></App>
      </Card>
    </PageHeaderWrapper>
    );
  }
}

const WrappedNormalCreateForm = Form.create({ name: 'create-form' })(NormalCreateForm);
export default WrappedNormalCreateForm
