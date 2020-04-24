import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { Form, Input, Button, message, Upload } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

@connect(({ user, Project, loading }) => ({
  Project,
  user,
  loading,
}))
class NormalCreateProject extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { name, _id } = this.props.user.currentUser
    const { createProjectStatus } = this.props.Project
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.owner = name
        values.ownerid = _id
        values.time = new Date()
        const { dispatch } = this.props
        dispatch({
          type: 'Project/createProject',
          payload: values,
        });
        if (createProjectStatus.payload.code === 0) {
          message.error(createProjectStatus.payload.msg);
        } else if (createProjectStatus.payload.code === 1) {
          message.success(createProjectStatus.payload.msg);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderWrapper>
      <Form onSubmit={this.handleSubmit} className="createproject-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="项目名称">
          {getFieldDecorator('projectname', {
            rules: [{ required: true, message: '请填写项目名称' }],
          })(
            <Input
              placeholder="项目名称"
            />,
          )}
        </Form.Item>
        <Form.Item label="项目描述">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: '请填写项目描述' }],
          })(
            <TextArea
              placeholder="项目描述"
            />,
          )}
        </Form.Item>
        <Form.Item label="所在学科">
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: '请填写所在学科' }],
          })(
            <Input
              placeholder="所在学科"
            />,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit" block>
            提交
          </Button>
        </Form.Item>
      </Form>
      </PageHeaderWrapper>
    );
  }
}

const WrappedNormalCreateProject = Form.create({ name: 'createproject-form' })(NormalCreateProject);
export default WrappedNormalCreateProject
