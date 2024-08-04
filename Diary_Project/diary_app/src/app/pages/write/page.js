"use client";

import React, { useEffect, useState } from "react";
import {
  StyledTitleInput,
  StyledTitleWrapper,
  StyledDetialInput,
  StyledBtnSave,
} from "./styles";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/app/utils/axiosSet";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function write() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const params = useSearchParams();
  let year = params.get("year");
  let month = params.get("month");
  let day = params.get("day");

  const saveDiary = () => {
    let date =
      year +
      "-" +
      (month.length === 1 ? "0" + month : month) +
      "-" +
      (day.length === 1 ? "0" + day : day);
    const data = { title: title, detail: detail, date: date };
    axiosInstance.post("/diary/add", data);
    router.push("/pages/calendar");
  };

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <StyledDetialInput
          id="detail"
          type="text"
          placeholder="당신만의 이야기를 들려주세요."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></StyledDetialInput>
        <br />
        <div style={{ position: "relative", width: "360px" }}>
          <StyledBtnSave onClick={saveDiary}>기록하기</StyledBtnSave>
        </div>
      </div>
    </div>
  );
}
