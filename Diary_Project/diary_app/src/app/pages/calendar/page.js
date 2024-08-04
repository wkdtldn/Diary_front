"use client";

import React, { useEffect, useState } from "react";
import {
  StyledCalendar,
  StyledCalendarWrapper,
  StyledBtnDetail,
  StyledBtnWrite,
  StyledBtnWrapper,
  StyledDot,
  StyledToday,
  ContentWrapper,
  Line,
  Content,
  DateText,
  Time,
  WeekText,
} from "./styles";
import moment from "moment";
import Link from "next/link";
import axiosInstance from "@/app/utils/axiosSet";

export default function calendarPage() {
  const today = new Date();
  const [value, setValue] = useState(new Date());
  const handleDate = (newDate) => {
    setValue(newDate);
  };
  const [diaryDate, setDiaryDate] = useState([]);

  // useEffect(() => {
  //   axiosInstance
  //     .get("/diary/all/date")
  //     .then((res) => setDiaryDate(res.data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <StyledCalendarWrapper>
        <StyledCalendar
          locale="ko"
          value={value}
          onChange={handleDate}
          formatDay={(locale, date) => moment(date).format("D")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory" // 일요일 부터 시작
          showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
          next2Label={null} // +1년 & +10년 이동 버튼 숨기기
          prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
          minDetail="year" // 10년단위 년도 숨기기
          tileContent={({ date, view }) => {
            if (
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) {
              return <StyledToday key={"today"}>오늘</StyledToday>;
            }
            // if (diaryDate[0]) {
            //   if (
            //     diaryDate.find((x) => x === moment(date).format("YYYY-MM-DD"))
            //   ) {
            //     return <StyledDot></StyledDot>;
            //   }
            // }
          }}
        />
      </StyledCalendarWrapper>
      <br />
      <div
        style={{
          width: "100%",
          height: "auto",
          overflow: "scroll",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ContentWrapper>
          <Line></Line>
          {/* 여기부터 map 함수로 반복할 예정 */}
          <Content>
            <Time>
              <DateText>8월 12일</DateText>
              <WeekText>금요일</WeekText>
            </Time>
          </Content>
          <Line></Line>
        </ContentWrapper>
      </div>
      {/* <StyledBtnWrapper>
        <StyledBtnDetail>
          <Link
            href={{ pathname: "/pages/detail" }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            자세히 보기
          </Link>
        </StyledBtnDetail>

        <StyledBtnWrite>
          <Link
            href={{
              pathname: "/pages/write",
              query: {
                year: value.getFullYear(),
                month: value.getMonth() + 1,
                day: value.getDate(),
              },
            }}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            일기 쓰기
          </Link>
        </StyledBtnWrite>
      </StyledBtnWrapper> */}
    </div>
  );
}
