import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import styled from "styled-components";

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    border: none;
    width: 330px;
    background-color: white;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.25);
    border-radius: 0.6rem;
    font-size: 1rem;
    padding: 5% 7%;
  }

  // 네비게이션바
  .react-calendar__navigation {
    justify-content: center;
    margin-bottom: 15px;
    margin-top: 15px;
    font-weight: bold;
  }

  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }
  .react-calendar__navigation button {
    border-radius: 0.6rem;
  }
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:active,
  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:disabled,
  .react-calendar__navigation button:disabled:hover,
  .react-calendar__navigation button:disabled:focus {
    background-color: white;
  }

  // 요일 밑줄 제거
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  // 일요일 글씨 빨간색
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: rgb(252, 85, 29);
  }
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }

  // 현재 날짜 글씨 색 변경
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: rgb(227, 107, 31);
    }
  }

  // 날짜 스타일링
  .react-calendar__tile {
    padding: 5px 0px 17px;
    position: relative;
    border-radius: 0.25rem;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: rgb(255, 226, 191);
    color: black;
  }
`;

export const StyledDot = styled.div`
  background-color: rgb(162, 83, 46);
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 67%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledToday = styled.div`
  font-size: x-small;
  color: rgb(169, 70, 24);
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledCalendar = styled(Calendar)``;

export const StyledBtnWrapper = styled.div`
  width: 100%;
  height: 2.7rem;
  display: flex;
  font-weight: bold;
  button {
    transition-duration: 0.14s;
  }
  button:nth-child(1):hover {
    background-color: rgb(14, 156, 237);
  }
  button:nth-child(1):active {
    background-color: rgb(3, 138, 200);
    position: relative;
    margin-top: 1.4px;
    margin-bottom: 1.7px;
    margin-left: 4px;
    margin-right: 4px;
  }
  button:nth-child(2):hover {
    background-color: rgb(224, 36, 36);
  }
  button:nth-child(2):active {
    background-color: rgb(194, 18, 18);
    position: relative;
    margin-top: 1.4px;
    margin-bottom: 1.7px;
    margin-left: 4px;
    margin-right: 4px;
  }
`;

export const StyledBtnDetail = styled.button`
  width: 50%;
  height 100%;
  background-color: rgb(29, 181, 252);
  color: black;
  font-size: 0.94rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 0.43rem;
  border: none;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
`;

export const StyledBtnWrite = styled.button`
  width: 50%;
  height 100%;
  background-color: rgb(252, 82, 82);
  color: black;
  font-size: 0.94rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 0.43rem;
  border: none;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
`;
