import styled from "styled-components";
import {
  DialogTitle,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";
import { colors } from "../util/config";

export const StyledDialogTitle = styled(DialogTitle)`
  width: 35vw;
`;

export const StyledDialogActions = styled(DialogActions)`
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  gap: 10px;
`;

export const StyledTitle = styled(TextField)`
  padding-left: 18px;
`;

export const SaveButton = styled(Button)`
  background-color: ${colors.lightblue};
  border-radius: 5px;
  width: 50px;
  margin: 20px 0 20px 0;
`;
