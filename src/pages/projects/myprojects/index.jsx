import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Avatar, Card, Col, Row, Icon, List, Popconfirm } from 'antd';
import Link from 'umi/link';
import moment from 'moment';
import styles from './style.less';


@connect(({ projectList, loading }) => ({
  project: projectList.data, // 将data赋值给
  loading,
}))


class project extends PureComponent {
// eslint-disable-next-line react/sort-comp
componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectList/fetch',
    });
  }

  delete = (id, e) => {
    e.stopPropagation();
    // eslint-disable-next-line no-console
    console.log(e)
   const { dispatch } = this.props;
   dispatch({
     type: 'projectList/delete',
     payload: id,
   })
 }

 togo= url => {
  const { dispatch } = this.props;
  dispatch({
    type: 'projectList/togo',
    payload: url,
  });
 }


    render() {
      const IconText = ({ type, text }) => (
        <span>
          <Icon type={type} style={{ marginRight: 8 }} />
          {text}
        </span>
      );

        const {
            // eslint-disable-next-line no-shadow
            project,
          } = this.props;
      return (
      <PageHeaderWrapper>
        <List
    itemLayout="vertical"
    bordered
    size="large"
    pagination={{
      onChange: page => {
        // eslint-disable-next-line no-console
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={project}
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <IconText type="star-o" text="156" key="list-vertical-star-o" />,
          <IconText type="like-o" text="156" key="list-vertical-like-o" />,
          <IconText type="message" text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          // title={<a href={`/project/project/${item._id}`}>{item.Protitle}</a>}
          title={<a onClick={this.togo.bind(this, `/project/project/${item._id}`)}>{item.Protitle}</a>}
          description={item.subject}
        />
        {item.description}
      </List.Item>
    )}
  />,
      </PageHeaderWrapper>
      );
    }
  }

  export default project
