import React, {PureComponent} from 'react';
import ImageWrapper from '@/components/ImageWrapper';
import { connect } from "dva";
import { PageHeaderWrapper} from '@ant-design/pro-layout';
import { Button } from 'antd';

@connect(({ newPage, loading }) => ({
  data: newPage.data, // 将data赋值给
  loading: loading
}))
 class test1 extends PureComponent {
   ontest = () => {
     const { dispatch } = this.props;
     dispatch({
       type: "newPage/fetch",
     })
   }
   


  render() {
    let { data } = this.props;
    return (
    <PageHeaderWrapper>
    <Button
            size="large"
            htmlType="submit"
            type="primary"
            onClick={this.ontest}
            >Primary
            </Button>
     <div>
        姓名：{data.userName}<br/>
        学号：{data.studentNo}<br/>
        年龄：{data.age}<br/>
        性别：{data.sex}<br/>
      </div>
      </PageHeaderWrapper>
    );
  }
}

export default test1
