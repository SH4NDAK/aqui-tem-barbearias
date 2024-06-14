// Otpcontext.js
import React, { createContext, useState } from 'react';

const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
  const [otp, setOtp] = useState(null);

  const updateOtp = (newOtp) => {
    setOtp(newOtp);
  };

  return (
    <OtpContext.Provider value={{ otp, updateOtp }}>
      {children}
    </OtpContext.Provider>
  );
};

export default OtpContext;
