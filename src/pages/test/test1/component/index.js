
import React, { PureComponent } from 'react';
import { Drawer, Button } from 'antd';
import Inputmodal from './inputmodal'
import Selectmodal from './selectmodal'


class App extends PureComponent {
  state = {
    drawervisible: false,
  };

  showDrawer = () => {
    this.setState({
      drawervisible: true,
    });
  };

  onClose = () => {
    this.setState({
      drawervisible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          添加表单项
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.drawervisible}
        >
            <Inputmodal />
            <Selectmodal />


        </Drawer>
      </div>
    );
  }
}

export default App
