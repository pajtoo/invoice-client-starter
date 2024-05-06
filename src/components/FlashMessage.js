import React, { useState } from "react";
import "../styles/flashMessageStyle.css"

export const FlashMessage = ({ theme, text }) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(false);

  return (
  <>
    {isVisible && <div className={"sticky-top-flashmessage z-5 alert alert-" + theme}>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            {text}
          </div>
          <div className="col text-end">
            <button type="button" className="btn fw-bold fs-5" onClick={handleClose}>x</button>
          </div>
        </div>
      </div>
    </div>
    }
  </>);
}

export default FlashMessage;
