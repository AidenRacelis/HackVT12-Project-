import React, { useState } from "react";
import "./Profile.css";

import AverageScoreTracker from "./FrontendFunctions/AverageScoreTracker";

export default function Profile() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Profile
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Realtor Profile</h2>
            <img className="client" src='./assets/Client1.png' alt="Client 1" />
            <p>
              <AverageScoreTracker />
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