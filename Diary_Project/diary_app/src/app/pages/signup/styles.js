import styled from "styled-components";

export const StyledSignupInputWrapper = styled.div`
  width: 330px;
  height: 350px;
  border: 1px solid black;
  border-radius: 12px;
  background-color: rgb(237, 243, 246);
  margin: 2rem 0 0 0;
  padding: 0 0 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1;
  label {
    position: absolute;
    top: 1.06rem;
    left: 2px;
    font-size: 1.1rem;
    transition-duration: 0.2s;
  }
  input:focus ~ label,
  input:valid ~ label {
    color: #1d98c2;
    font-size: 0.84rem;
    top: -4.3px;
    left: 0;
  }
`;

export const StyledSignupInputCover = styled.div`
  position: relative;
  width: 280px;
  display: flex;
  justify-content: center;
`;

export const StyledSignupInput = styled.input`
  width: 270px;
  height: 45px;
  margin-bottom: 10px;
  background: none;
  border-width: 0 0 2px;
  border-color: black;
  outline: none;
  font-size: 0.95rem;
`;

export const StyledSignupBtn = styled.button`
  width: 65px;
  height: 35px;
  background-color: #6ebb96;
  border-radius: 0.3rem;
  position: absolute;
  right: 30px;
`;
