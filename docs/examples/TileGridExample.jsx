import React from 'react';
import Example from '../components/Example';
import {
  TileGrid,
} from '../../src/dist-entry';


class TileGridExample extends React.PureComponent {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    return;
  }

  render() {
    return (
      <TileGrid
        title="Browse by category"
        items={[
          { id: '0', classSuffix: 'news', title: 'News' },
          { id: '1', classSuffix: 'sport', title: 'Sport' },
          { id: '2', classSuffix: 'health', title: 'Health & Fitness' },
          { id: '3', classSuffix: 'tech', title: 'Technology & Computing' },
        ]}
        onItemClick={this.onClick}
      />
    );
  }
}


const exampleProps = {
  componentName: 'Tile Grid',
  exampleCodeSnippet: `<TileGrid
  title="Browse by category"
  items={[
    { id: '0', classSuffix: 'news', title: 'News' },
    { id: '1', classSuffix: 'sport', title: 'Sport' },
    { id: '2', classSuffix: 'health', title: 'Health & Fitness' },
    { id: '3', classSuffix: 'tech', title: 'Technology & Computing' },
  ]}
  onItemClick={this.onClick}
/>`,
  propTypes: [
    {
      propType: 'id',
      type: 'string',
    },
    {
      propType: 'classSuffix',
      type: 'string',
    },
    {
      propType: 'title',
      type: 'string',
    },
    {
      propType: 'onItemClick',
      type: 'func',
    },
  ],
};


export default () => <Example {...exampleProps}><TileGridExample /></Example>;
