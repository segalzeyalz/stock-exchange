import React from 'react';
import CSS from './SimetricX.css';
//Using functional in order to mount it once
//component for closing the popup
const SimetricX = (props) => {
  return <div className={CSS.XContiner}>
     <font className={CSS.SimetricX} onClick={props.closePopup}>✖</font>
  </div>
};

export default SimetricX;

