import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import {
  Panel,
} from '../../src/dist-entry';

class PanelExample extends React.Component {
  constructor() {
    super();
    this.state = {
      isCollapsed: true,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel() {
    const nextPanel = _.assign({}, this.state);
    nextPanel.isCollapsed = !nextPanel.isCollapsed;
    this.setState(nextPanel);
  }

  render() {
    return (
      <Panel
        id="8db886a1-671f-4a40-a000-3c6bf1f87ecd"
        title="Read more about integration"
        isCollapsed={this.state.isCollapsed}
        onClick={this.togglePanel}
      >
        <p>
          Lorem ipsum amet dolore voluptate veniam nulla dolore nulla adipisicing irure
          adipisicing qui fugiat veniam. Ullamco reprehenderit cillum irure esse ad eu dolor laboris.
        </p>
        <p>Consequat commodo consequat eiusmod sit mollit elit ex nostrud consectetur.</p>
      </Panel>
    );
  }
}


const exampleProps = {
  componentName: 'Panel',
  exampleCodeSnippet: `<Panel
  id="8db886a1-671f-4a40-a000-3c6bf1f87ecd"
  title="Read more about integration"
  isCollapsed={this.state.isCollapsed}
  onClick={this.togglePanel}
>
  <p>
    Lorem ipsum amet dolore voluptate veniam nulla dolore nulla adipisicing irure
    adipisicing qui fugiat veniam. Ullamco reprehenderit cillum irure esse ad eu dolor laboris.
  </p>
  <p>Consequat commodo consequat eiusmod sit mollit elit ex nostrud consectetur.</p>
</Panel>`,
  propTypes: [
    {
      propType: 'id',
      type: 'string',
      defaultValue: '',
      note: '',
    },
    {
      propType: 'title',
      type: 'string',
      defaultValue: '',
      note: '',
    },
    {
      propType: 'isCollapsed',
      type: 'boolean',
      defaultValue: '',
      note: '',
    },
    {
      propType: 'onClick',
      type: 'func',
      defaultValue: '',
      note: '',
    },
    {
      propType: 'children',
      type: 'node',
      defaultValue: '',
      note: '',
    },
  ],
};


export default () => <Example {...exampleProps}><PanelExample /></Example>;
