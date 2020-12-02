import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { colors } from "../../util/config";

export const AddEventWrapper = styled.div`
  position: fixed;
  bottom: 7vh;
  right: 5vw;
`;

export const AddButton = styled(IconButton)`
  background: ${colors.lightblue};
  width: 60px;
  height: 60px;
  &:hover {
    opacity: 0.8;
    background: ${colors.lightblue};
  }
`;
