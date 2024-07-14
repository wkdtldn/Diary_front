import styled from "styled-components";

export const StyledTitleInput = styled.input`
  border-width: 0 0 1px;
  border-color: gray;
  background: none;
  font-family: "ONE-Mobile-POP";
  font-size: 1.2rem;
  position: relative;
  top: 0;
  margin: 0 0 0 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgb(167, 164, 171);
    font-weight: bold;
    font-size: 1rem;
  }
`;

export const StyledTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledDetialInput = styled.textarea`
  border-radius: 0.3rem;
  width: 360px;
  height: 470px;
  background: none;
  resize: none;
  background-image: linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    repeating-linear-gradient(
      white,
      white 30px,
      #ccc 30px,
      #ccc 31px,
      white 31px
    );
  padding: 8px 10px;
  line-height: 31px;
  font-family: "GangwonEdu_OTFBoldA";
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
  word-wrap: break-word;
  &::-webkit-scrollbar {
    display: none;
  }
  &:focus {
    outline: none;
  }
`;

export const StyledBtnSave = styled.button`
  background-color: rgb(211, 178, 255);
  text-align: center;
  font-family: "ONE-Mobile-POP";
  transition-duration: 0.2s;
  width: 135px;
  height: 40px;
  position: absolute;
  right: 0px;
  border-radius: 0.3rem;
  font-size: 1rem;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
  &:hover {
    background-color: rgb(160, 108, 228);
  }
  &:active {
    right: 3.6px;
    width: 125px;
    height: 35px;
    font-size: 0.9rem;
  }
`;
