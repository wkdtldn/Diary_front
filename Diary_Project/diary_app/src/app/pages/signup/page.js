"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  StyledSignupInputWrapper,
  StyledSignupInputCover,
  StyledSignupBtn,
  StyledSignupInput,
} from "./styles";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axiosSet";

export default function signupPage() {
  const router = useRouter();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const [CheckPassword, setCheckPassword] = useState("");
  const PasswordCheck =
    Password === ""
      ? true
      : CheckPassword === ""
      ? true
      : Password === CheckPassword
      ? true
      : false;

  const filterInput = () => {
    var essential_words = /[!@#^*?.]/gi;
    var essential_nums = /[1234567890]/gi;
    if (Username.trim() == "") {
      alert("아이디를 확인해주세요.");
    } else if (!email_regex.test(Email)) {
      alert("이메일을 형식에 맞게 작성해주세요. (example@gmail.com)");
    } else if (Password.trim() == "") {
      alert("비밀번호를 확인해주세요.");
    } else if (Password.search(essential_words) <= -1) {
      alert("비밀번호는 특수문자를 포함해야합니다.");
    } else if (Password.search(essential_nums) <= -1) {
      alert("비밀번호는 숫자를 포함해야합니다.");
    } else if (CheckPassword !== Password) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      return true;
    }
    return false;
  };
  const signup = () => {
    if (filterInput) {
      const data = {
        username: Username,
        email: Email,
        password: Password,
      };
      axiosInstance
        .post("/register", data)
        .then((res) =>
          res.data
            ? router.push("/pages/login")
            : alert(
                `"${Username}" 라는 이름의 계정이 존재합니다. 다시 시도해주세요.`
              )
        );
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "HSSanTokki20-Regular",
      }}
    >
      <span style={{ fontSize: "2rem" }}>Sign Up</span>
      <StyledSignupInputWrapper>
        <StyledSignupInputCover>
          <StyledSignupInput
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></StyledSignupInput>
          <label>User ID</label>
        </StyledSignupInputCover>
        <StyledSignupInputCover>
          <StyledSignupInput
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></StyledSignupInput>
          <label>Email</label>
        </StyledSignupInputCover>
        <StyledSignupInputCover>
          <StyledSignupInput
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></StyledSignupInput>
          <label>Password</label>
        </StyledSignupInputCover>
        <StyledSignupInputCover>
          <StyledSignupInput
            type="password"
            value={CheckPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            required
          ></StyledSignupInput>
          <label>Check Password</label>
          {PasswordCheck !== true ? (
            <p
              style={{
                fontFamily: "Arial",
                fontSize: "0.76rem",
                position: "absolute",
                bottom: "-10px",
                marginTop: "10px",
                left: "5px",
                color: "red",
              }}
            >
              비밀번호가 일치하지 않습니다.
            </p>
          ) : (
            false
          )}
        </StyledSignupInputCover>
        <br />
        <div
          style={{ position: "relative", width: "100%", marginTop: "1.3rem" }}
        >
          <StyledSignupBtn id="signup" onClick={signup}>
            회원가입
          </StyledSignupBtn>
        </div>
      </StyledSignupInputWrapper>
      <div
        style={{
          width: "330px",
          marginTop: "3rem",
          textDecoration: "underline",
          textDecorationThickness: "1.7px",
          fontSize: "0.85rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ marginRight: "12px" }}>
          <Link href={{ pathname: "/pages/login" }}>계정이 존재하나요?</Link>
        </div>
      </div>
    </div>
  );
}
