import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const Otp = () => {
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else {
        setShowResend(true);
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setShowResend(false);
    setOtp(['', '', '', '', '', '']);
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    console.log('Verifying OTP:', otpString);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md mx-auto">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="text-center mt-4 text-lg sm:text-xl lg:text-2xl"
        >
          Enter Verification Code
        </Typography>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              We've sent a verification code to your device
            </p>
            {!showResend && (
              <p className="text-sm text-gray-500">
                Time remaining: {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, '0')}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleVerify}
              className="w-full"
              disabled={otp.includes('')}
            >
              Verify Code
            </Button>

            {showResend && (
              <Button
                onClick={handleResend}
                variant="outlined"
                className="w-full"
              >
                Resend Code
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Otp;
