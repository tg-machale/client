import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Icon, Row, Col, Pagination, Descriptions } from 'antd'
import ProductList from './component';

@connect(({ test, loading }) => ({
  test, // 将data赋值给
  loading,
}))
 class Products extends PureComponent {
  // eslint-disable-next-line react/sort-comp
  handleDelete = id => {
    const { dispatch } = this.props;
      dispatch({
          type: 'test/delete',
          payload: id,
      })
  }

  componentDidMount() {
    const { dispatch } = this.props;
         dispatch({
           type: "test/in",
         })
  }



  render() {
        let { data } = this.props.test

    return (
        <PageHeaderWrapper>
        <div>
          <h2>List of Products</h2>
          <ProductList onDelete={this.handleDelete} products={data} />
        </div>
        <Icon type = "sync" spin ></Icon>
        <div>
          <Row>
            <Col span = {8}>1</Col>
            <Col span = {8}>2</Col>
            <Col span = {8}>3</Col>
          </Row>
        </div>
        <Pagination defaultCurrent={3} total={50} />
        <Descriptions title="User Info" bordered="true">
           <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
           <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
           <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
           <Descriptions.Item label="Remark">empty</Descriptions.Item>
           <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
           </Descriptions.Item>
           <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
           </Descriptions.Item>
         </Descriptions>
        </PageHeaderWrapper>
      );
   
      mountNode
  }
}

export default Products