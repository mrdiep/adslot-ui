import _ from 'lodash';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { Overlay, Popover } from 'react-bootstrap';
import Avatar from 'alexandria/Avatar';
import HoverDropdown from './';
import PopoverLinkItem from './PopoverLinkItem';

describe('HoverDropdownComponent', () => {
  let props = {};
  let sandbox = null;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    props = {
      headerText: 'test header',
      links: [
        {
          title: 'Link 1',
          url: 'www.some.url.com',
          target: '_self',
          isEnabled: true,
        },
        {
          title: 'Logout',
          url: 'http://www.google.com',
          target: '_self',
          isEnabled: true,
        },
      ],
      hoverComponent: (<Avatar givenName="John" surname="Smith" tooltip="test tooltip" />),
      onLinkClick: _.noop,
    };

    sandbox.spy(props, 'onLinkClick');
  });

  afterEach(() => sandbox.restore());

  it('should render with default props', () => {
    const component = shallow(<HoverDropdown hoverComponent={props.hoverComponent} />);
    expect(component.find(Avatar)).to.have.length(1);
    expect(component.find(Overlay)).to.have.length(0);
  });

  it('should render popover with list of links when `links` is not empty', () => {
    const component = shallow(<HoverDropdown {...props} />);
    expect(component.find(Overlay)).to.have.length(1);
    expect(component.find(PopoverLinkItem)).to.have.length(2);
  });

  it('should set state to open dropdown when hovering on the component', () => {
    const component = shallow(<HoverDropdown {...props} />);
    component.find('.hover-dropdown').simulate('mouseEnter', { target: 'some target' });
    expect(component.state()).to.eql({
      isOpen: true,
      target: 'some target',
      mouseInPopover: false,
    });
  });

  it('should set `state.isOpen` to false when leaving the component', (done) => {
    const component = shallow(<HoverDropdown {...props} />);
    component.setState({ isOpen: true });
    component.find('.hover-dropdown').simulate('mouseLeave');
    setTimeout(() => {
      expect(component.state('isOpen')).to.equal(false);
      done();
    }, 200);
  });

  it('should not set `state.isOpen` to false when `state.mouseInPopover` is true', (done) => {
    const component = shallow(<HoverDropdown {...props} />);
    component.setState({ isOpen: true, mouseInPopover: true });
    component.find('.hover-dropdown').simulate('mouseLeave');
    setTimeout(() => {
      expect(component.state('isOpen')).to.equal(true);
      done();
    }, 200);
  });

  it('should set `state.mouseInPopover` to true when user entering popover', () => {
    const component = shallow(<HoverDropdown {...props} />);
    component.find(Popover).simulate('mouseEnter');
    expect(component.state('mouseInPopover')).to.equal(true);
  });

  it('should set `state.mouseInPopover` and `state.isOpen` to false when user leaving popover', (done) => {
    const component = shallow(<HoverDropdown {...props} />);
    component.setState({ mouseInPopover: true, isOpen: true });
    component.find(Popover).simulate('mouseLeave');
    setTimeout(() => {
      expect(component.state('mouseInPopover')).to.equal(false);
      expect(component.state('isOpen')).to.equal(false);
      done();
    }, 200);
  });

  it('should trigger `props.onLinkClick` and change state when user clicks on a link item', (done) => {
    const component = shallow(<HoverDropdown {...props} />);
    component.setState({ isOpen: true });
    component.find(PopoverLinkItem).at(0).simulate('click');

    // must set timeout due to `_.debounce`
    setTimeout(() => {
      expect(props.onLinkClick.calledOnce).to.equal(true);
      expect(component.state('isOpen')).to.equal(false);
      done();
    }, 200);
  });

  it('should alter position of popover and arrow to left position', () => {
    const component = shallow(<HoverDropdown {...props} arrowPosition="left" />);
    const { onEntering } = component.find(Overlay).props();

    const element = {
      style: { left: '100px' },
      children: [
        { style: { left: '50%' } },
      ],
    };
    onEntering(element);

    expect(element).to.eql({
      style: { left: '148px' },
      children: [
        { style: { left: '20%' } },
      ],
    });
  });

  it('should alter position of popover and arrow to right position', () => {
    const component = shallow(<HoverDropdown {...props} arrowPosition="right" />);
    const { onEntering } = component.find(Overlay).props();

    const element = {
      style: { left: '100px' },
      children: [
        { style: { left: '50%' } },
      ],
    };
    onEntering(element);

    expect(element).to.eql({
      style: { left: '52px' },
      children: [
        { style: { left: '80%' } },
      ],
    });
  });
});
