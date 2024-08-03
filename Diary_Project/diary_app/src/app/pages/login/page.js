"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  StyledLoginInputWrapper,
  StyledLoginInputCover,
  StyledLoginBtn,
  StyledLoginInput,
} from "./styles";
import { login } from "@/app/utils/auth";
import { useRouter } from "next/navigation";

export function LoginPage() {
  const router = useRouter();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  const Login = async () => {
    if (filterInput()) {
      const res = await login(Username, Email, Password);
      if (res.result) {
        router.push("/pages/calendar");
      } else {
        alert(res.msg);
      }
    }
  };

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
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></StyledLoginInput>
          <label>User ID</label>
        </StyledLoginInputCover>
        <StyledLoginInputCover>
          <StyledLoginInput
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></StyledLoginInput>
          <label>Email</label>
        </StyledLoginInputCover>
        <StyledLoginInputCover>
          <StyledLoginInput
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
          <StyledLoginBtn onClick={Login}>로그인</StyledLoginBtn>
        </div>
      </StyledLoginInputWrapper>
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
          <Link href={{ pathname: "/pages/signup" }}>회원가입</Link>
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

export default LoginPage;
