"use client";

import React from "react";
import {
  StyledTitleInput,
  StyledTitleWrapper,
  StyledDetialInput,
  StyledBtnSave,
} from "./styles";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function write() {
  const params = useSearchParams();
  let year = params.get("year");
  let month = params.get("month");
  let day = params.get("day");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: "2rem 1rem 1rem 1rem",
          fontSize: "1.3rem",
          fontFamily: "Ownglyph_UNZ-Rg",
        }}
      >
        <span>
          &lt; {year}년 {month}월 {day}일 &gt;
        </span>
      </div>
      <StyledTitleWrapper>
        <span
          style={{
            marginTop: "0.4rem",
            fontSize: "1.1rem",
            fontFamily: "ONE-Mobile-POP",
          }}
        >
          제목 :
        </span>
        <StyledTitleInput
          id="title"
          placeholder="일기 제목을 입력해주세요!"
        ></StyledTitleInput>
      </StyledTitleWrapper>
      <br />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          verticalAlign: "top",
          textAlign: "left",
        }}
      >
        <StyledDetialInput id="detail" type="text"></StyledDetialInput>
        <br />
        <div style={{ position: "relative", width: "360px" }}>
          <StyledBtnSave>
            <Link
              href={{ pathname: "/pages/calendar" }}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              기록하기
            </Link>
          </StyledBtnSave>
        </div>
      </div>
    </div>
  );
}
