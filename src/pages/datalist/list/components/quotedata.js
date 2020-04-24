
import React, { PureComponent } from 'react';
import { Modal, Button, Form, Drawer, Switch, Select } from 'antd';
import { connect } from 'dva'

const { Option } = Select;


@connect(({ user, project, loading, quotedata }) => ({
  project,
  quotedata,
  user,
  loading,
}))
class NormalQuotedataForm extends PureComponent {
  state = {
    visible: false,
    prolist: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { _id } = this.props.user.currentUser

    dispatch({
    type: 'quotedata/initpro',
    payload: _id,
    });

    const children = this.props.quotedata.prolist;
    const prolist = []
    // children.map(item => (
    //   prolist.push(`<Option key=${item._id}>${item.Protitle}</Option>`)
    // ),
    this.setState({
      prolist: children,
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { formcreatedata } = this.props.formcreate;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        const data = values
        data.type = 'Input'
        data.dataIndex = data.title
        data.key = data.title
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

  gettargetform = (form, targetCol) => {
    if (targetCol === undefined) {
      targetCol = []
    }
    for (let i = 0; i < form.length; i++) {
      if (form[i].type === 'Card') {
        this.gettargetform(form[i].children, targetCol)
      }
      if (form[i].type !== 'Card') {
        for (let k = 0; k < targetCol.length; k++) {
          if (targetCol[k] === form[i].title) {
            form[i].view = 'true'
          }
      }
    }
  }
  return form
  }

  relform = (targetform) => {
    for (let i = 0; i < targetform.length; i++) {
      if (targetform[i].type === 'Card') {
        this.relform(targetform[i].children)
      }
      if (targetform[i].type !== 'Card') {
        if (targetform[i].view !== 'true' || targetform[i].view === undefined) {
          const index = targetform.indexOf(targetform[i])
          targetform.splice(index)
        }
      }
  }
  return targetform
  }

  getrelform = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === 'Card') {
        this.getrelform(data[i].children)
      }
        delete data[i].view
  }
  return data
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = {}
    const targetdata = []
    // eslint-disable-next-line no-underscore-dangle
    const userId = this.props.user.currentUser._id
    // eslint-disable-next-line no-underscore-dangle
    const projectId = this.props.project.project._id
    const { form } = this.props.project.project
    const formdata = this.props.project.project.data

    this.props.form.validateFields((err, values) => {
      if (!err) {
        data.targetId = values.pid
        data.userId = userId
        data.projectId = projectId
        const targetCol = []
        delete values.pid
        // eslint-disable-next-line no-restricted-syntax
        for (const key in values) {
          if (values[key] === true) {
            targetCol.push(key)
          }
        }

        // 获取项目数据
        for (let a = 0; a < formdata.length; a++ ) {
          const obj = {}
          for (const key in formdata[a]) {
            for (let b = 0; b < targetCol.length; b++) {
              if (targetCol[b] === key) {
                  obj[key] = formdata[a][key]
                
              }
            }
          }
          targetdata.push(obj)
        }
        const targetform = this.gettargetform(form, targetCol)
        data.targetCol = targetCol
        data.targetform = this.getrelform(this.relform(targetform))
        data.targetdata = targetdata
        const { dispatch } = this.props;
        dispatch({
          type: 'quotedata/quote',
          payload: data,
        });
      }
    });
  };


  getformlist = (form, getFieldDecorator, arr) => {
        for (let i = 0; i < form.length; i++) {
          if (form[i].type === 'Card') {
            this.getformlist(form[i].children, getFieldDecorator, arr);
          }
          if (form[i].type !== 'Card') {
            arr.push(form[i])
          }
        }
        return arr
    }

  render() {
    const { visible, prolist } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props.project.project
    const arr = this.getformlist(form, getFieldDecorator, [])
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 20 }}>
         输入框
        </Button>
        <Drawer
          title="请填写该表单项具体信息"
          closable={false}
          visible={visible}
          onClose={this.handleCancel}
          width= "400"
        >
        <Form onSubmit={this.handleSubmit} className="input-form" labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} labelAlign="left">
        <Form.Item label="目的项目">
               {getFieldDecorator('pid')(
                <Select style={{ width: '100%' }} maxTagCount={ 1 } >
                {prolist.map(item => (
                  // eslint-disable-next-line no-underscore-dangle
                  <Option key={item._id}>{item.Protitle}</Option>
                ))}
              </Select>,
               )}
              </Form.Item>
            {arr.map(item => (
              <Form.Item label= {item.title} key={item.title}>
              {getFieldDecorator(`${item.title}`, {
              })(<Switch />)}
            </Form.Item>
            ))}
         <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
        </Drawer>
      </div>
    );
  }
}

const Inputmodal = Form.create({ name: 'input-form' })(NormalQuotedataForm);
export default Inputmodal
