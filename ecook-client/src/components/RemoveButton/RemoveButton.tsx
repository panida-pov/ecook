import "./RemoveButton.css";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type RemoveButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
  bgColor?: string;
};

export const RemoveButton = (props: RemoveButtonProps) => {
  return (
    <button
      className="clearButton"
      type={props.submit ? "submit" : "button"}
      onClick={props.onClick}
    >
      <CancelRoundedIcon
        style={{ fontSize: "1.4rem", color: `${props.bgColor ?? "#7F7F7F"}` }}
      />
    </button>
  );
};
