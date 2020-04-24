import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Divider, Form, Input, Select, Card, Table, Modal, Row, Col, Popconfirm, message } from 'antd';
import Quotedata from './components/quotedata'
import styles from './style.less';

@connect(({ project, user, loading, quotedata }) => ({
  project, // 将data赋值给
  user,
  loading,
  quotedata,
}))

  class list extends PureComponent {
    state = {
      formcolumn: [],
      Visible: false,
      dataitem: {},
    }

  dataAdd = [{
    title: '操作',
    render: (text, record) => (
      <Fragment>
        <a onClick={() => this.handleUpdateModalVisible(record)}>修改</a>
        <Divider type="vertical" />
        <Popconfirm
          title="你确定要删除此条数据?"
          onConfirm={() => this.confirm(record)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">删除</a>
        </Popconfirm>
      </Fragment>
    ),
  }]

    componentDidMount() {
      const { project } = this.props.project
      const column = project.form
      const formcolumn = column.concat(this.dataAdd)
      this.setState({
        formcolumn,
      });
    }

    confirm= record => {
      const { _id } = this.props.project.project
      const { dispatch } = this.props;
      const data = {
        projectid: _id,
        dataid: record.id,
      }
      dispatch({
        type: 'project/deletedataitem',
        payload: data,
      });
    }

    handleUpdateModalVisible = record => {
      this.setState({
        Visible: true,
        dataitem: record,
      });
    }

    handleOk = () => {
      const { _id } = this.props.project.project
      const { dataitem } = this.state
      this.props.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-param-reassign
          values.id = dataitem.id
          const data = {
            id: _id,
            values,
            dataId: dataitem.id,
          }
          const { dispatch } = this.props;
        dispatch({
          type: 'project/updataitemdata',
          payload: data,
        });
        }
      })
      this.setState({
        Visible: false,
      });
    };

    handleCancel = e => {
      this.setState({
        Visible: false,
      });
    };

    renderCreateForm = (item, getFieldDecorator) => {
      const { dataitem } = this.state
      if (item.type === 'Input') {
        return (
        <Form.Item label= {item.title} key={item.id}>
          {getFieldDecorator(`${item.title}`, {
            initialValue: JSON.stringify(dataitem) === '{}' ? '' : `${dataitem[item.title]}`,
          })(<Input >
          </Input>)}
        </Form.Item>
        )
      } if (item.type === 'Select') {
        return (
          <Form.Item label={item.title} key={item.id}>
          {getFieldDecorator(`${item.title}`, {
            initialValue: JSON.stringify(dataitem) === '{}' ? '' : `${dataitem[item.title]}`,
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
      <Card title= {item.title} key={item.id} bordered={false} className={styles.cardstyle}>
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
     const { formcolumn, Visible } = this.state
    const { project } = this.props.project
    const dataSource = project.data;
    const { form } = project;
    const { getFieldDecorator } = this.props.form;
     return (
     <PageHeaderWrapper>
         <Card>
         <Table columns={formcolumn} dataSource={dataSource} scroll={{ x: 1300 }} />
         <Quotedata></Quotedata>
         <Modal
          title="Basic Modal"
          visible={Visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width= {1000}
          className={styles.modalstyle}
        >
          <Form onSubmit={this.handleSubmit} className="form" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} style={{ width: 800 }}>
        {form[0].children.map(item => (
            this.renderCreateForm(item, getFieldDecorator)
        ))}
        </Form>
        </Modal>
         </Card>
       </PageHeaderWrapper>
     );
   }
 }

 const WrappedNormallist = Form.create({ name: 'form' })(list);

export default WrappedNormallist
