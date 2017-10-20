import _ from 'lodash';
import React, { PropTypes } from 'react';
import DROPDOWN_MENU_ITEM_PROPTYPES from '../propTypes';
import './styles.scss';


class PopoverLinkItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onLinkItemClick = this.onLinkItemClick.bind(this);
  }

  onLinkItemClick() {
    const { link, onClick } = this.props;
    onClick(link);
  }

  render() {
    const { link } = this.props;

    const anchorProps = {
      disabled: !link.isEnabled,
      onClick: this.onLinkItemClick,
    };

    if (link.target !== '_modal') {
      _.assign(anchorProps, { href: link.url });
    }

    return (
      <li className="popover-link-item">
        <a {...anchorProps}>{link.title}</a>
      </li>
    );
  }
}

PopoverLinkItem.propTypes = {
  link: PropTypes.shape(DROPDOWN_MENU_ITEM_PROPTYPES).isRequired,
  onClick: PropTypes.func,
};

PopoverLinkItem.defaultProps = {
  onClick: _.noop,
};

export default PopoverLinkItem;
