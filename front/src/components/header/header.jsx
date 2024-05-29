import React, { useState } from 'react';
import "./header.scss"
import Modal from '../modal/modal.jsx';
const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const clickHandler = () => {
    setModalVisible(prevState => !prevState)
  };
  
  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__logo">
        Worker
        </div>
        <button onClick={clickHandler} className="header__info">
          Info
        </button>
      </div>
      <Modal visible={modalVisible} clickHandler={clickHandler}/>
    </div>
  );
};

export default Header;