import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component, Fragment } from 'react';
import { List } from 'antd';
import Password from './password'
import Phone from './phone'
import { connect } from 'dva';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
// const passwordStrength = {
//   strong: (
//     <span className="strong">
//       <FormattedMessage id="accountandsettings.security.strong" defaultMessage="Strong" />
//     </span>
//   ),
//   medium: (
//     <span className="medium">
//       <FormattedMessage id="accountandsettings.security.medium" defaultMessage="Medium" />
//     </span>
//   ),
//   weak: (
//     <span className="weak">
//       <FormattedMessage id="accountandsettings.security.weak" defaultMessage="Weak" />
//       Weak
//     </span>
//   ),
// };

class SecurityView extends Component {
  getpasswordStrength = () => {
    const { pwd } = this.props.currentUser
    let passwordStrength = null
    if (pwd.length <= 5) {
      passwordStrength = '弱'
    } if (pwd.length <= 10 && pwd.lengh >= 5) {
      passwordStrength = '中等'
    } if (pwd.length >= 10) {
      passwordStrength = '强'
    }
    return passwordStrength
  }

  getphone = () => {
    const { phone } = this.props.currentUser
    const head = phone.slice(0, 3)
    const foot = phone.slice(7, 11)
    const secretPhone = `${head}****${foot}`
    return secretPhone
  }

  getData = () => [
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.password',
        },
        {},
      ),
      description: (
        <Fragment>
          {formatMessage({
            id: 'accountandsettings.security.password-description',
          })}
          ：{this.getpasswordStrength()}
        </Fragment>
      ),
      actions: [
       <Password onClick={ this.showModal }></Password>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.phone',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountandsettings.security.phone-description',
        },
        {},
      )}：${this.getphone()}`,
      actions: [
        <Phone onClick={ this.showModal }></Phone>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.question',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.security.question-description',
        },
        {},
      ),
      actions: [
        <a key="Set">
          <FormattedMessage id="accountandsettings.security.set" defaultMessage="Set" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountandsettings.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify">
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.mfa',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.security.mfa-description',
        },
        {},
      ),
      actions: [
        <a key="bind">
          <FormattedMessage id="accountandsettings.security.bind" defaultMessage="Bind" />
        </a>,
      ],
    },
  ];

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default SecurityView;
