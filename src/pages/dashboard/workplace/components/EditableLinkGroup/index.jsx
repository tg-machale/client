import React, { PureComponent, createElement } from 'react';
import styles from './index.less';

class EditableLinkGroup extends PureComponent {
  static defaultProps = {
    links: [],
    linkElement: 'a',
  };

  render() {
    const { links, linkElement } = this.props;
    return (
      <div className={styles.linkGroup}>
        {links.map(link =>
          createElement(
            linkElement,
            {
              key: `linkGroup-item-${link.id || link.title}`,
              to: link.href,
              href: link.href,
            },
            link.title,
          ),
        )}
      </div>
    );
  }
}

export default EditableLinkGroup;
