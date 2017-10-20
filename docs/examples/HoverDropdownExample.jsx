import React from 'react';
import Example from '../components/Example';
import {
  Avatar,
  HoverDropdown,
  Modal,
} from '../../src/dist-entry';


class HoverDropdownExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const props1 = {
      arrowPosition: 'left',
      headerText: 'header',
      onLinkClick: (link) => {
        if (link.target === '_modal') {
          this.setState({ isModalOpen: true });
        } else {
          alert('clicked');
        }
      },
      hoverComponent: (<Avatar givenName="John" surname="Smith" tooltip="test tooltip" />),
      links: [
        {
          title: 'Adslot.com',
          url: 'http://www.adslot.com',
          target: '_self',
          group: '',
          isEnabled: true,
          childNavigationLinks: [],
        },
        {
          title: 'Open Modal',
          url: 'http://www.google.com',
          target: '_modal',
          group: '',
          isEnabled: true,
          childNavigationLinks: [],
        },
      ],
    };

    const props2 = {
      arrowPosition: 'right',
      headerText: 'Hello User',
      onLinkClick: (link) => {
        if (link.target === '_modal') {
          this.setState({ isModalOpen: true });
        } else {
          alert('clicked');
        }
      },
      hoverComponent: (<Avatar givenName="James" surname="Bond" tooltip="test tooltip" />),
      links: [
        {
          title: 'Adslot.com',
          url: 'http://www.adslot.com',
          target: '_self',
          group: '',
          isEnabled: true,
          childNavigationLinks: [],
        },
        {
          title: 'Open Modal',
          url: 'http://www.google.com',
          target: '_modal',
          group: '',
          isEnabled: true,
          childNavigationLinks: [],
        },
      ],
    };

    return (
      <div className="hover-dropdown-example">
        <HoverDropdown {...props1} />
        <HoverDropdown {...props2} />
        <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Sample body
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


const exampleProps = {
  componentName: 'HoverDropdown',
  notes: '',
  exampleCodeSnippet: `
    const props = {
      arrowPosition: 'left',
      headerText: 'header',
      onLinkClick: (link) => {
        if (link.target === '_modal') {
          this.setState({ isModalOpen: true });
        } else {
          alert('clicked');
        }
      },
      hoverComponent: (<Avatar givenName="John" surname="Smith" tooltip="test tooltip" />),
      links: [
        {
          title: 'Adslot.com',
          url: 'http://www.adslot.com',
          target: '_self',
          group: '',
          isEnabled: true,
          childNavigationLinks: [],
        },
        {
          title: 'Open Modal',
          url: 'http://www.google.com',
          target: '_modal',
          group: '',
          isEnabled: true,
          childNavigationLinks: [],
        },
      ],
    };

    <div className="hover-dropdown-example">
      <HoverDropdown {...props} />
      <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sample body
        </Modal.Body>
      </Modal>
    </div>
  `,
  propTypes: [
    {
      propType: 'arrowPosition',
      type: "oneOf ['left', 'right']",
      defaultValue: 'left',
      note: 'determine the placement of the popover',
    }, {
      propType: 'headerText',
      type: 'string',
      defaultValue: '',
      note: 'If set to empty string, header will not be rendered.',
    }, {
      propType: 'links',
      type: "arrayOf {oneOf ['_self', '_modal']: target, string: title, string: url, bool: isEnabled}",
      defaultValue: '[ ]',
      note: 'Each link will be used to render dropdown item',
    }, {
      propType: 'hoverComponent',
      type: 'node',
      note: 'displayed element to be hovered on',
    }, {
      propType: 'onLinkClick',
      type: 'func',
      note: 'onLinkClick(link), callback when user clicks on a dropdown item; link is an object of `links` prop',
      defaultValue: '_.noop',
    },
  ],
};


export default () => <Example {...exampleProps}><HoverDropdownExample /></Example>;
