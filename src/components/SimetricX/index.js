import React from 'react';
import CSS from './SimetricX.css'
const SimetricX = (props) => {
  return <div className={CSS.XContiner}>
     <font className={CSS.SimetricX} onClick={props.closePopup}>✖</font>
  </div>
};

export default SimetricX;

