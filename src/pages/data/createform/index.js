import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

import { Card, Form, Input, Select, Button, notification, Row, Col, Icon } from 'antd'
import { connect } from 'dva'
import App from './component'
import IconFont from '../../../components/iconfont'

@connect(({ formcreate, project, loading }) => ({
  formcreate,
  project,
  loading,
}))

 class NormalCreateForm extends PureComponent {
  state = {
    project: {},
  };

  componentDidMount() {
    if (this.props.project !== undefined) {
      this.setState({
        project: this.props.project.project,
      });
      const { dispatch } = this.props;
      const { form } = this.props.project.project

          dispatch({
           type: 'formcreate/initformdata',
           payload: form,
          });
    } else {
      notification.open({
        type: 'error',
        message: '错误',
        description:
          '没有选择项目，请点击我到我的项目中去选择项目',
        onClick: () => {
          const { dispatch } = this.props;
          dispatch({
           type: 'formcreate/togo',
           payload: '/project/myproject',
          });
        },
      });
    }
  }

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

  getdeleteitem = (targetform, title) => {
    for (let i = 0; i < targetform.length; i++) {
      if (targetform[i].type === 'Card') {
        this.getdeleteitem(targetform[i].children, title)
      }
      if (targetform[i].type !== 'Card') {
        if (targetform[i].title === title) {
          const index = targetform.indexOf(targetform[i])
          targetform.splice(index, 1)
        }
      }
  }
  return targetform
  }

  deleteitem = key => {
    const { _id, form } = this.props.project.project
    const newform = this.getdeleteitem(form, key)
    const data = {
      id: _id,
      newform,
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'formcreate/deleteitem',
      payload: data,
    });
  }

   renderCreateForm = (item, getFieldDecorator) => {
      if (item.type === 'Input') {
        return (
          <Row>
            <Col span={23}>
        <Form.Item label= {item.title} key={item.id}>
          {getFieldDecorator(`${item.title}`, {
          })(<Input />)}
        </Form.Item>
        </Col>
        <Col span={1}>
        <IconFont type="icon-jian" className={styles.iconstyle} onClick={() => { this.deleteitem(item.title) }} />
        </Col>
        </Row>
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
      } if (item.type === 'Card') {
        return (
          <Row>
      <Col span={12} offset={5}>
      <Card title= {item.title} key={item.id} className={styles.cardstyle}>
       { item.children.map(childitem => (
          this.renderCreateForm(childitem, getFieldDecorator)
       ))
      }
      </Card>
      </Col>
    </Row>
        )
      }
   }


   togo= url => {
    const { dispatch } = this.props;
    dispatch({
      type: 'formcreate/togo',
      payload: url,
    });
   }

  render() {
    const { formcreatedata } = this.props.formcreate;
    const { getFieldDecorator } = this.props.form;
    const { project } = this.state;
    const formdata = formcreatedata[0].children
    return (
    <PageHeaderWrapper>
      <Card>
      <Form onSubmit={this.handleSubmit} className="create-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
        <Form.Item label="项目id">
          {getFieldDecorator('id', {
             initialValue: project._id,
            rules: [{ required: true, message: '请填写项目id' }],
          })(
            <Input
              placeholder="项目id"
            />,
          )}
        </Form.Item>
        {formdata.map(item => (
            this.renderCreateForm(item, getFieldDecorator)
        ))}
         <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit" className={styles.submitstyle}>
            提交
          </Button>
        </Form.Item>
        </Form>
     <App></App>
     <Button className={styles.buttonstyle} type="primary" onClick={this.togo.bind(this,'/data/adddata')} >添加数据</Button>
      </Card>
    </PageHeaderWrapper>
    );
  }
}

const WrappedNormalCreateForm = Form.create({ name: 'create-form' })(NormalCreateForm);
export default WrappedNormalCreateForm
