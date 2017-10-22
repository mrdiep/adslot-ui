import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BootstrapButton from 'react-bootstrap/lib/Button';
import { expandDts } from 'lib/utils';

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {
      inverse,
      children,
      dts,
    } = this.props;

    return (
      <BootstrapButton
        {..._.pick(this.props, _.keys(BootstrapButton.propTypes))}
        className={classNames({ 'btn-inverse': inverse })}
        {...expandDts(dts)}
      >{children}</BootstrapButton>
    );
  }
}

Button.propTypes = _.assign({
  inverse: PropTypes.bool,
  dts: PropTypes.string,
}, BootstrapButton.propTypes);

Button.defaultProps = _.assign({
  inverse: false,
}, BootstrapButton.defaultProps);

export default Button;
