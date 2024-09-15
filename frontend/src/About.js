import React, { useState } from "react";
import "./About.css";

export default function About() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal-about">
        About Us
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Learn About Us!</h2>
            <p>
              We are David&Them, David & David & Aiden & Richard.
              
            </p>
            <p>
            Purpose: To have users practice in real estate if they wish to pursue the field or simply play for fun!
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}