import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster, ToastIcon } from "react-hot-toast";
import { Button, Container, TextField } from "@mui/material";
import { Row } from "react-bootstrap";


export default function ForgetPassword() {
  let [email, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [Otp, setOtp] = useState("");
  const usernameHandler = (e) => {
    email = e.target.value;
    console.log(email);
    setUsername(email);
  };
  const newPasswordHandler = (e) => {
    password = e.target.value;
    console.log(password);
    setPassword(password);
  };
  const OtpHandler = (e) => {
    Otp = e.target.value;
    setOtp(Otp);
  };

  const verifyOtp = async () => {
  const response = await axios.post("http://localhost:8080/verifyOtp", null, {
      params: { otp: Otp },
    });
    if (response.data == true) {
      return (
        <>
          <Container>
            <TextField
              id="Update Password"
              label="Update Password"
              type="text"
              onChange={newPasswordHandler}
            />
          </Container>
          <Row>
            <Button onClick={verifyOtp}>VerifyOtp</Button>
          </Row>
        </>
      );
    }
  };
  const sendOtp = async () => {
    const response = await axios.post(
      "http://localhost:8080/ForgetPasswordGenerateOtp",
      null,
      {
        params: { email: email },
      }
    );
    if (response.data == true) {
      toast.success("OTP sent Successfully");
      return (
        <>
          <Container>
            <TextField
              id="EnterOTP"
              label="EnterOTP"
              type="text"
              onChange={OtpHandler}
            />
          </Container>
          <Row>
            <Button onClick={verifyOtp}>SendOtp</Button>
          </Row>
        </>
      );
    }
  };

  return (
    <>
    
      <Container>
        <TextField
          id="email"
          label="Email"
          type="text"
          onChange={usernameHandler}
        />

        <Toaster position="top-center" reverseOrder={false} />
        <Row>
          <Button onClick={sendOtp}>SendOtp</Button>
        </Row>
      </Container>
    </>
  );
}
