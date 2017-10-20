import { PropTypes } from 'react';

const DROPDOWN_MENU_ITEM_PROPTYPES = {
  target: PropTypes.oneOf(['_self', '_modal']),  // not sure if there are any other target type
  title: PropTypes.string,
  url: PropTypes.string,
  isEnabled: PropTypes.bool,
};

export default DROPDOWN_MENU_ITEM_PROPTYPES;
