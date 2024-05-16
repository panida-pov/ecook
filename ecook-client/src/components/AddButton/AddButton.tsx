import "./AddButton.css";
import AddIcon from "@mui/icons-material/Add";

type AddButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  bgColor?: string;
  color?: string;
};

export const AddButton = (props: AddButtonProps) => {
  return (
    <button
      className="add-button"
      style={{ backgroundColor: props.bgColor, color: props.color }}
      onClick={props.onClick}
    >
      <AddIcon style={{ fontSize: "1.6rem", marginRight: "0.2rem" }} />
      ADD MORE
    </button>
  );
};
