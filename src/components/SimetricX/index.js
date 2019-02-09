import React from 'react';
import PropTypes from 'prop-types';
import CSS from './SimetricX.scss';
//Using functional in order to mount it once
//component for closing the popup
const SimetricX = (props) => {
  return <div className={CSS.XContiner}>
     <font className={CSS.SimetricX} onClick={props.closePopup}>✖</font>
  </div>
};

SimetricX.PropTypes = {
  closePopup: PropTypes.func
}
export default SimetricX;

