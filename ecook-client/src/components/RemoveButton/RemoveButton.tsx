import "./RemoveButton.css";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type RemoveButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit";
};

export const RemoveButton = (props: RemoveButtonProps) => {
  return (
    <button className="clearButton" type={props.type} onClick={props.onClick}>
      <CancelRoundedIcon style={{ fontSize: "1.4rem", color: "#7F7F7F" }} />
    </button>
  );
};
