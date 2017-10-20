import _ from 'lodash';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import PopoverLinkItem from './';

describe('PopoverLinkItemComponent', () => {
  let props = {};
  let sandbox = null;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    props = {
      link: {
        title: 'Link 1',
        url: 'www.some.url.com',
        target: '_self',
        isEnabled: true,
      },
      onClick: _.noop,
    };

    sandbox.spy(props, 'onClick');
  });

  afterEach(() => sandbox.restore());

  it('should render with default props', () => {
    const component = shallow(<PopoverLinkItem {...props} />);
    expect(component.find('li')).to.have.length(1);
    expect(component.find('li a').props().href).to.equal('www.some.url.com');
  });

  it('should trigger `props.onClick` when clicking on the component', () => {
    const component = shallow(<PopoverLinkItem {...props} />);
    component.find('li a').simulate('click');
    expect(props.onClick.calledOnce).to.equal(true);
  });

  it('should not have href props on `PopoverLinkItem` when `link.target` is _modal', () => {
    props.link.target = '_modal';
    const component = shallow(<PopoverLinkItem {...props} />);
    expect(component.find('li a').props().href).to.equal(undefined);
  });
});
