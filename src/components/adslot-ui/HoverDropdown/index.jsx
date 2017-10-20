import _ from 'lodash';
import React, { PropTypes } from 'react';
import { ListGroup, Overlay, Popover } from 'react-bootstrap';
import PopoverLinkItem from './PopoverLinkItem';
import DROPDOWN_MENU_ITEM_PROPTYPES from './propTypes';
import './styles.scss';

// if change this, change the width in styles.scss too
const POPOVER_WIDTH = 160;

export class HoverDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      target: null,
      mouseInPopover: false,
    };

    this.closeMenu = _.debounce(() => {
      if (!this.state.mouseInPopover) {
        this.setState({
          isOpen: false,
        });
      }
    }, 100);

    this.openMenu = this.openMenu.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
    this.popoverEnterHandler = this.popoverEnterHandler.bind(this);
    this.popoverLeaveHandler = this.popoverLeaveHandler.bind(this);
    this.onEntering = this.onEntering.bind(this);
  }

  onLinkClick(link) {
    this.closeMenu();
    this.props.onLinkClick(link);
  }

  onEntering(element) {
    // alter popover position to left-oriented or right-oriented
    let { left } = element.style;
    // trim 'px' at the end
    left = parseFloat(left.replace(/px$/, ''));
    const offset = 0.3 * POPOVER_WIDTH;
    const newLeft = this.props.arrowPosition === 'left' ? left + offset : left - offset;

    _.assign(element.style, {
      left: `${newLeft}px`,
    });

    // alter arrow position to left-oriented or right-oriented
    _.assign(element.children[0].style, {
      left: this.props.arrowPosition === 'left' ? '20%' : '80%',
    });
  }

  openMenu(event) {
    this.setState({
      isOpen: true,
      target: event.target,
      mouseInPopover: false,
    });
  }

  popoverEnterHandler() {
    this.setState({ mouseInPopover: true });
  }

  popoverLeaveHandler() {
    this.setState({ mouseInPopover: false });
    this.closeMenu();
  }

  render() {
    const {
      arrowPosition,
      links,
      headerText,
      hoverComponent,
    } = this.props;

    return (
      <div
        className="hover-dropdown"
        onClick={this.openMenu}
        onMouseEnter={this.openMenu}
        onMouseLeave={this.closeMenu}
      >
        {hoverComponent}
        {links.length > 0 ? (
          <Overlay
            show={this.state.isOpen}
            target={this.state.target}
            placement="bottom"
            onEntering={this.onEntering}
          >
            <Popover
              id="hover-dropdown-popover"
              className="hover-dropdown-popover"
              onMouseEnter={this.popoverEnterHandler}
              onMouseLeave={this.popoverLeaveHandler}
              title={headerText}
              arrowOffsetLeft={arrowPosition === 'left' ? '20%' : '80%'}
              positionLeft="20%"
            >
              <ListGroup>
                {links.map((link) => (
                  <PopoverLinkItem
                    key={link.title}
                    link={link}
                    onClick={this.onLinkClick}
                  />
                ))}
              </ListGroup>
            </Popover>
          </Overlay>
        ) : null}

      </div>
    );
  }
}

HoverDropDown.propTypes = {
  arrowPosition: PropTypes.oneOf(['left', 'right']),
  headerText: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape(DROPDOWN_MENU_ITEM_PROPTYPES)),
  hoverComponent: PropTypes.element.isRequired,
  onLinkClick: PropTypes.func,
};

HoverDropDown.defaultProps = {
  arrowPosition: 'left',
  headerText: '',
  links: [],
  onLinkClick: _.noop,
};

export default HoverDropDown;
