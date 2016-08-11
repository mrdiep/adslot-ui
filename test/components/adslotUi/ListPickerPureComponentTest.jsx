import _ from 'lodash';
import Checkbox from 'react-icheck/lib/Checkbox';
import ListPickerMocks from 'mocks/ListPickerMocks';
import ListPickerPureComponent from 'components/adslotUi/ListPickerPureComponent';
import Radio from 'react-icheck/lib/Radio';
import React from 'react';
import { Empty, Grid, GridCell, GridRow } from 'alexandria-adslot';
import { shallow } from 'enzyme';

describe('ListPickerPureComponent', () => {
  const {
    getInitialSelection,
    labelFormatter,
    teamMember4,
    userHeaders,
    users,
    usersWithUuid,
  } = ListPickerMocks;

  const selectedItems = getInitialSelection();

  Object.freeze(selectedItems);

  it('should render with defaults', () => {
    const component = shallow(<ListPickerPureComponent />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-undefined');

    const gridElements = component.find(Grid);
    expect(gridElements).to.have.length(1);

    const emptyElement = gridElements.find(Empty);
    expect(emptyElement.prop('collection')).to.have.length(0);
    expect(emptyElement.prop('text')).to.equal('No items to select.');
  });

  it('should render with props', () => {
    const props = { items: users, itemHeaders: userHeaders, itemType: 'user', labelFormatter, selectedItems };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const headerGridElement = component.find(Grid).first();
    const gridHeaderElement = headerGridElement.find(GridRow);
    expect(gridHeaderElement.prop('type')).to.equal('header');

    const gridHeaderCellElements = gridHeaderElement.find(GridCell);
    expect(gridHeaderCellElements.first().children().text()).to.equal('Team');
    expect(gridHeaderCellElements.last().children().text()).to.equal('Member');

    const gridElement = component.find(Grid).last();
    const gridRowElements = gridElement.find(GridRow);
    gridRowElements.forEach((gridRowElement, index) => {
      const gridRowCellElements = gridRowElement.find(GridCell);
      const gridRowCellLeftElement = gridRowCellElements.first();
      expect(gridRowCellLeftElement.prop('stretch')).to.equal(true);
      expect(gridRowCellLeftElement.prop('dts')).to.equal('label');

      const gridRowCellLeftText = gridRowCellLeftElement.children().text();
      expect(gridRowCellLeftText).to.equal(labelFormatter(users[index]));

      const gridRowCellRightElement = gridRowCellElements.last();
      expect(gridRowCellRightElement.prop('dts')).to.equal('toggle');
      const gridRowCellToggleElement = gridRowCellRightElement.find(Checkbox);
      expect(gridRowCellToggleElement.prop('checked')).to.equal(_.some(selectedItems, { id: users[index].id }));
    });
  });

  it('should render with props including items and selectItems with uuids', () => {
    const selectedItemsWithUuid = [teamMember4];
    const props = {
      items: usersWithUuid,
      itemHeaders: userHeaders,
      itemType: 'user',
      labelFormatter,
      selectedItems: selectedItemsWithUuid,
    };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const headerGridElement = component.find(Grid).first();
    const gridHeaderElement = headerGridElement.find(GridRow);
    expect(gridHeaderElement.prop('type')).to.equal('header');

    const gridHeaderCellElements = gridHeaderElement.find(GridCell);
    expect(gridHeaderCellElements.first().children().text()).to.equal('Team');
    expect(gridHeaderCellElements.last().children().text()).to.equal('Member');

    const gridElement = component.find(Grid).last();
    const gridRowElements = gridElement.find(GridRow);
    gridRowElements.forEach((gridRowElement, index) => {
      const gridRowCellElements = gridRowElement.find(GridCell);
      const gridRowCellLeftElement = gridRowCellElements.first();
      expect(gridRowCellLeftElement.prop('stretch')).to.equal(true);
      expect(gridRowCellLeftElement.prop('dts')).to.equal('label');

      const gridRowCellLeftText = gridRowCellLeftElement.children().text();
      expect(gridRowCellLeftText).to.equal(labelFormatter(usersWithUuid[index]));

      const gridRowCellRightElement = gridRowCellElements.last();
      expect(gridRowCellRightElement.prop('dts')).to.equal('toggle');
      const gridRowCellToggleElement = gridRowCellRightElement.find(Checkbox);
      const isUserChecked = _.some(selectedItemsWithUuid, { id: usersWithUuid[index].id });
      expect(gridRowCellToggleElement.prop('checked')).to.equal(isUserChecked);
    });
  });

  it('should render with props including addonFormatter', () => {
    const addonFormatter = () => (<Empty />);
    const itemHeaders = _.assign({}, ListPickerMocks.userHeaders, { addon: 'Required' });
    const props = { items: users, itemHeaders, itemType: 'user', labelFormatter, selectedItems, addonFormatter };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const headerGridElement = component.find(Grid).first();
    const gridHeaderElement = headerGridElement.find(GridRow);
    const gridHeaderCellElements = gridHeaderElement.find(GridCell);
    expect(gridHeaderCellElements.last().children().text()).to.equal('Required');

    const gridElement = component.find(Grid).last();
    const gridRowElements = gridElement.find(GridRow);
    gridRowElements.forEach((gridRowElement) => {
      const gridRowCellRightElement = gridRowElement.find(GridCell).last();
      expect(gridRowCellRightElement.prop('dts')).to.equal('addon');
      const gridRowCellAddonElement = gridRowCellRightElement.find(Empty);
      expect(gridRowCellAddonElement.length).to.equal(1);
    });
  });

  it('should render radio buttons with `allowMultiSelection` as false', () => {
    const props = { allowMultiSelection: false, items: users, itemType: 'user', selectedItems };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const gridElement = component.find(Grid);
    const gridRowElements = gridElement.find(GridRow);
    gridRowElements.forEach((gridRowElement, index) => {
      const gridRowCellElements = gridRowElement.find(GridCell);
      const gridRowCellRightElement = gridRowCellElements.last();
      expect(gridRowCellRightElement.prop('dts')).to.equal('toggle');
      const gridRowCellToggleElement = gridRowCellRightElement.find(Radio);
      expect(gridRowCellToggleElement).to.have.length(1);
      expect(gridRowCellToggleElement.prop('checked')).to.equal(_.some(selectedItems, { id: users[index].id }));
    });
  });

  it('should throw when we select without a `selectItem` handler', () => {
    const props = { items: users, itemType: 'user', selectedItems };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const gridElement = component.find(Grid);
    const gridRowElements = gridElement.find(GridRow);
    const unselectedCheckboxElement = gridRowElements.at(0).find(Checkbox);
    expect(unselectedCheckboxElement.prop('checked')).to.equal(false);

    expect(() => unselectedCheckboxElement.simulate('change', null, true)).to.throw(
      'AdslotUi ListPickerPure needs a selectItem handler'
    );
  });

  it('should throw when we deselect without a `deselectItem` handler', () => {
    const props = { items: users, itemType: 'user', selectedItems };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const gridElement = component.find(Grid);
    const gridRowElements = gridElement.find(GridRow);
    const selectedCheckboxElement = gridRowElements.at(1).find(Checkbox);
    expect(selectedCheckboxElement.prop('checked')).to.equal(true);

    expect(() => selectedCheckboxElement.simulate('change', null, false)).to.throw(
      'AdslotUi ListPickerPure needs a deselectItem handler'
    );
  });

  it('should call `selectItem` handler when we select', () => {
    let handlerCalled = 0;
    let isAllowMultiSelection;
    const props = {
      allowMultiSelection: false,
      items: users,
      itemType: 'user',
      selectedItems,
      selectItem: (item, allowMultiSelection) => {
        handlerCalled++;
        isAllowMultiSelection = allowMultiSelection;
      },
    };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const gridElement = component.find(Grid);
    const gridRowElements = gridElement.find(GridRow);
    const unselectedRadioButtonElement = gridRowElements.at(0).find(Radio);
    expect(unselectedRadioButtonElement.prop('checked')).to.equal(false);

    unselectedRadioButtonElement.simulate('change', null, true);
    expect(handlerCalled).to.equal(1);
    expect(isAllowMultiSelection).to.equal(false);
  });

  it('should call `deselectItem` handler when we deselect', () => {
    let handlerCalled = 0;
    let isAllowMultiSelection;
    const props = {
      items: users,
      itemType: 'user',
      selectedItems,
      deselectItem: (item, allowMultiSelection) => {
        handlerCalled++;
        isAllowMultiSelection = allowMultiSelection;
      },
    };
    const component = shallow(<ListPickerPureComponent {...props} />);
    expect(component.prop('className')).to.equal('listpickerpure-component');
    expect(component.prop('data-test-selector')).to.equal('listpickerpure-component-user');

    const gridElement = component.find(Grid);
    const gridRowElements = gridElement.find(GridRow);
    const selectedCheckboxElement = gridRowElements.at(1).find(Checkbox);
    expect(selectedCheckboxElement.prop('checked')).to.equal(true);

    selectedCheckboxElement.simulate('change', null, false);
    expect(handlerCalled).to.equal(1);
    expect(isAllowMultiSelection).to.equal(true);
  });
});