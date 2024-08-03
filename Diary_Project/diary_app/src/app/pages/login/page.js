"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  StyledLoginInputWrapper,
  StyledLoginInputCover,
  StyledLoginBtn,
  StyledLoginInput,
} from "./styles";
import { login } from "@/app/utils/auth";

const ConditionalLink = ({ href, children, condition }) => {};

export function loginPage() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  const [loggedin, setLoggedin] = useState(false);

  const filterInput = () => {
    if (Username.trim() == "") {
      alert("아이디를 확인해주세요.");
    } else if (!email_regex.test(Email)) {
      alert("이메일을 형식에 맞게 작성해주세요. (example@gmail.com)");
    } else if (Password.trim() == "") {
      alert("비밀번호를 확인해주세요.");
    } else {
      return true;
    }
    return false;
  };
  const Submit = async (e) => {
    e.preventDefault();
    if (filterInput()) {
      try {
        await login(Username, Email, Password);
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
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
      <span style={{ fontSize: "2rem" }}>Login</span>
      <StyledLoginInputWrapper>
        <StyledLoginInputCover>
          <StyledLoginInput
            id="username"
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></StyledLoginInput>
          <label>User ID</label>
        </StyledLoginInputCover>
        <StyledLoginInputCover>
          <StyledLoginInput
            id="email"
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></StyledLoginInput>
          <label>Email</label>
        </StyledLoginInputCover>
        <StyledLoginInputCover>
          <StyledLoginInput
            id="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          ></StyledLoginInput>
          <label>Password</label>
        </StyledLoginInputCover>
        <br />
        <div
          style={{ position: "relative", width: "100%", marginTop: "1.3rem" }}
        >
          <StyledLoginBtn type="submit" onClick={() => Submit()}>
            <Link
              href={{
                pathname: "/pages/calendar",
                query: { user: Username },
              }}
              style={{ height: "100%", width: "100%" }}
            >
              로그인
            </Link>
          </StyledLoginBtn>
        </div>
      </StyledLoginInputWrapper>
      <div
        style={{
          width: "330px",
          marginTop: "2.3rem",
          textDecoration: "underline",
          textDecorationThickness: "1.7px",
          fontSize: "0.85rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ marginRight: "12px" }}>
          <Link href={{ pathname: "/pages/signup" }} passHref>
            회원가입
          </Link>
        </div>
        <div>
          <Link href={{ pathname: "/pages/find/user" }}>
            계정을 잃어버리셨나요?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
