import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import styles from './style.less';


const PageHeaderContent = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;

  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }

  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          你好，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};

const ExtraContent = () => (
  <div className={styles.extraContent}>
    <div className={styles.statItem}>
      <Statistic title="项目数" value={56} />
    </div>
    <div className={styles.statItem}>
      <Statistic title="项目访问" value={2223} />
    </div>
  </div>
);

@connect(
  ({ dashboardAndworkplace: { currentUser, projectNotice, activities, radarData }, loading }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['dashboardAndworkplace/fetchUserCurrent'],
    projectLoading: loading.effects['dashboardAndworkplace/fetchProjectNotice'],
    activitiesLoading: loading.effects['dashboardAndworkplace/fetchActivitiesList'],
  }),
)
@connect(({ userAndlogin, loading }) => ({
  user: userAndlogin.user, // 将data赋值给
  loading,
}))

class Workplace extends Component {
  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/init',
      payload: user.name,
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndworkplace/clear',
    });
  }

  renderActivities = item => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const {
      currentUser,
      activities,
      projectNotice,
      projectLoading,
      activitiesLoading,
    } = this.props;
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{
                marginBottom: 24,
              }}
              title="我的项目"
              bordered={false}
              extra={<Link to="/project/myproject">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{
                padding: 0,
              }}
            >
              {projectNotice.map(item => (
                <Link to={{
                  pathname: '/project/project',
                  query: {
                      id: item.id,
                  },
              }}>
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{
                      padding: 0,
                    }}
                    bordered={false}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                      description={item.description}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={item.memberLink}>{item.member || ''}</Link>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
                </Link>
              ))}
            </Card>
            <Card
              bodyStyle={{
                padding: 0,
              }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List
                loading={activitiesLoading}
                renderItem={item => this.renderActivities(item)}
                dataSource={activities}
                className={styles.activitiesList}
                size="large"
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{
                paddingTop: 12,
                paddingBottom: 12,
              }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {projectNotice.map(item => (
                    <Col span={24} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
