import React from 'react';
import Example from '../components/Example';
import {
  TextEllipsis,
} from '../../src/dist-entry';

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

class TextEllipsisExample extends React.PureComponent {
  render() {
    return (<TextEllipsis>{loremIpsum}</TextEllipsis>);
  }
}


const exampleProps = {
  componentName: 'Text Ellipsis',
  notes: 'Useful for single line truncation of text values, also provides a hover over displaying the full text.',
  exampleCodeSnippet: `<TextEllipsis>${loremIpsum}</TextEllipsis>`,
  propTypes: [{
    propType: 'children',
    type: 'node',
  }, {
    propType: 'overlayTriggerProps',
    type: 'shape',
    note: <span>See <a href="https://react-bootstrap.github.io/components.html#overlays-trigger-props" target="_blank" rel="noopener noreferrer">React Bootstrap Docs</a>.</span>,
  }, {
    propType: 'popoverProps',
    type: 'shape',
    note: <span>See <a href="https://react-bootstrap.github.io/components.html#popover-props" target="_blank" rel="noopener noreferrer">React Bootstrap Docs</a>.</span>,
  }],
};


export default () => <Example {...exampleProps}><TextEllipsisExample /></Example>;
