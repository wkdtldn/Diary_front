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
} from "./styles";
import moment from "moment";
import Link from "next/link";

export default function calendarPage() {
  const today = new Date();
  const [value, setValue] = useState(new Date());
  const handleDate = (newDate) => {
    setValue(newDate);
  };
  return (
    <div>
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
          }}
        />
      </StyledCalendarWrapper>
      <br />
      <StyledBtnWrapper>
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
            href={{ pathname: "/pages/write" }}
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
      </StyledBtnWrapper>
    </div>
  );
}
