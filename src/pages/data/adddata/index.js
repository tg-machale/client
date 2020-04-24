import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Form, Input, Select, Card, notification, Row, Col } from 'antd';

import styles from '../createform/style.less';

@connect(({ adddata, project, loading }) => ({
    adddata, // 将data赋值给
    project,
    loading,
  }))


  class adddata extends PureComponent {
    state = {
      formcreatedata: [],
      project: {},
    };

    componentDidMount() {
      if (this.props.project !== undefined) {
        this.setState({
          formcreatedata: this.props.project.project.form[0].children,
          project: this.props.project.project,
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

  createRandomId = () => {
    // eslint-disable-next-line max-len
    return (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(2, 5);
  }


    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          values.id = this.createRandomId()
          const { dispatch } = this.props;
        dispatch({
          type: 'addata/Addata',
          payload: values,
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
      } if (item.type === 'Card') {
        return (
          <Row>
      <Col span={12} offset={5}>
      <Card title= {item.title} key={item.id} size="small" className={styles.cardstyle}>
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

   render() {
     const { formcreatedata, project } = this.state;
     const { getFieldDecorator } = this.props.form;
     return (
     <PageHeaderWrapper>
        <Card>
      <Form onSubmit={this.handleSubmit} className="create-form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
      <Form.Item label= "项目id">
          {getFieldDecorator('proId', {
            initialValue: project._id,
          })(<Input />)}
        </Form.Item>
        <Form.Item label= "项目名称">
          {getFieldDecorator('proTitle', {
            initialValue: project.Protitle,
          })(<Input />)}
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
      </Card>
       </PageHeaderWrapper>
     );
   }
 }

 const Wrappedadddata = Form.create({ name: 'create-form' })(adddata);
export default Wrappedadddata
