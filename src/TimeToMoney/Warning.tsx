import React, { useState } from 'react';




const WarningModal: React.FC<{ warningContent: string }> = ({ warningContent }) => {
    return (
      <div>
        <h1>Warning</h1>
        <a>{warningContent}</a>
      </div>
    );
  };



export default WarningModal;