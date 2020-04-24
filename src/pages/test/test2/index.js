import React, { PureComponent } from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import Result from 'ant-design-pro/lib/Result';
import { Button } from 'antd';
import { PageHeaderWrapper} from '@ant-design/pro-layout';
import { connect } from "dva";
import 'ant-design-pro/dist/ant-design-pro.css';
import ProductList from './TableBasic';


@connect(({ List, loading }) => ({
  data: List.data, // 将data赋值给
  loading: loading
}))

class test2 extends PureComponent {
componentDidMount() {
    const { dispatch } = this.props;
         dispatch({
           type: 'List/fetch',
         })
  }

 Delete = (key) => {
   console.log(key)
  const { dispatch } = this.props;
  dispatch({
    type: 'List/delete',
    payload: key,
  })
}

  ontest = () => {

  };

  render() {
    let { data } = this.props;
    return (
    <PageHeaderWrapper>
       <ProductList products ={data} onDelete ={this.Delete}></ProductList>
       <Button size="large" htmlType="submit" type="primary" onClick={this.ontest}>
         Primary
       </Button>
     </PageHeaderWrapper>
    );
  }
}


export default test2;
