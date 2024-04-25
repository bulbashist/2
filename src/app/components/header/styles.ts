import styled from "styled-components";
import { CSSGap, CSSPadding } from "../../styles/constants";

export const HeaderWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${CSSGap.Small * 8}px;
  width: 100%;
  padding: ${CSSPadding.Small * 8}px ${CSSPadding.Large * 8}px;

  @media screen and (max-width: 768px) {
    justify-content: center;
    padding: ${CSSPadding.Small * 8}px;
  }
`;
