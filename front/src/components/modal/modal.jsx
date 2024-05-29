import React from 'react';
import classNames from 'classnames';
import './modal.scss'
const Modal = ({visible, clickHandler}) => {
  const fullscreenClasses = classNames({
    'fullscreen': true,
    'fullscreen_visible': visible,
  });
  
  return (
    <div className={fullscreenClasses}>
      <div className="modal">

        <button onClick={clickHandler} className="modal__close">
          <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="58" height="58" rx="29" fill="#4D4A5A"/>
            <path d="M15.4406 42.5596C16.0365 43.1382 17.0241 43.1382 17.603 42.5596L28.5 31.6694L39.3971 42.5596C39.9761 43.1382 40.9806 43.1552 41.5595 42.5596C42.1383 41.9641 42.1383 40.9942 41.5595 40.4157L30.6624 29.5084L41.5595 18.6183C42.1383 18.0398 42.1555 17.0528 41.5595 16.4743C40.9635 15.8788 39.9761 15.8788 39.3971 16.4743L28.5 27.3645L17.603 16.4743C17.0241 15.8788 16.0195 15.8617 15.4406 16.4743C14.8617 17.0699 14.8617 18.0398 15.4406 18.6183L26.3376 29.5084L15.4406 40.4157C14.8617 40.9942 14.8447 41.9811 15.4406 42.5596Z" fill="white"/>
          </svg>
        </button>
        <div className="modal__header">
          
          <div className="modal__header-el">
            <h1>Умножение Матриц X Workers</h1>
          </div>
        </div>
        <div className="modal__main">
          <p>
            Web Worker-ы предоставляют простое средство для запуска скриптов в фоновом потоке.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;