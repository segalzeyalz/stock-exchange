import React from 'react';
import propTypes from 'prop-types';
import CSS from './SimetricX.scss';
//Using functional in order to mount it once
//component for closing the popup
const SimetricX = (props) => {
  return <div className={CSS.XContiner}>
     <font className={CSS.SimetricX} onClick={props.closePopup}>✖</font>
  </div>
};

SimetricX.propTypes = {
  closePopup: propTypes.func
}
export default SimetricX;

