import { routerRedux } from 'dva/router';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Descriptions, Card, Divider, Table, Button, Input } from 'antd';


@connect(({ project, user, loading }) => ({
  project, // 将data赋值给
  user,
  loading,
}))
 class test1 extends PureComponent {
  state = {
    columns: [],
  };

   componentDidMount() {
     const { name } = this.props.user.currentUser
    const { id } = this.props.match.params
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchOne',
      payload: { id, name },
    });
  }

  show = () => {
    const { authority } = this.props.project
    if (authority === 'own') {
      return 'true'
    }
    if (authority === 'notown') {
      return 'false'
    }
  }

  togo = (url) => {
    console.log('aaa')
    const { dispatch } = this.props;
    dispatch({
      type: 'project/togo',
      payload: url,
    });
  }

  render() {
    const { own, authority, project } = this.props.project
    console.log(authority)
    const dataSource = project.data;
    const columns = project.form
    return (
    <PageHeaderWrapper>
        <Card bordered={false}>
          <Descriptions
            title="项目详情"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="id">{project._id}</Descriptions.Item>
            <Descriptions.Item label="项目名称">{project.Protitle}</Descriptions.Item>
            <Descriptions.Item label="简介">{project.description}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{`${project.createTime}`}</Descriptions.Item>
          <Descriptions.Item label="科目">{project.subject}</Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <Descriptions
            title="用户信息"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="用户姓名">{own.name}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{own.phone}</Descriptions.Item>
            <Descriptions.Item label="所属单位">{own.group}</Descriptions.Item>
            <Descriptions.Item label="地址">{own.address}</Descriptions.Item>
          <Descriptions.Item label="Email">{own.email}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card
              title="项目基础数据"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
              extra={
                <div>
                <Button disabled={authority === 'notown' } type="primary" onClick= {this.togo.bind(this, '/data/createform') } >修改表单</Button>
                <Button disabled={authority === 'notown'} type="primary" onClick= {this.togo.bind(this, '/data/adddata') } >添加数据</Button>
                </div>
            }
            >
             <Table bordered dataSource={dataSource} columns={columns} />;
            </Card>
    </PageHeaderWrapper>
    );
  }
}

export default test1
