import React, { useState } from "react";

export const FlashMessage = ({ theme, text }) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(true);

  return (<>
    {isVisible && <div className={"sticky-top z-1 alert alert-" + theme}>
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col">
            {text}
          </div>
          <div className="col">
            <button type="button" className="btn" onClick={() => {setIsVisible(false)}}>x</button>
          </div>
        </div>
      </div>
    </div>
    }
  </>);
}

export default FlashMessage;
