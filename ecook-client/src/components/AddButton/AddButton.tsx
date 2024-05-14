import "./AddButton.css";
import AddIcon from "@mui/icons-material/Add";

type AddButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const AddButton = (props: AddButtonProps) => {
  return (
    <button className="add-button" onClick={props.onClick}>
      <AddIcon style={{ fontSize: "1.6rem", marginRight: "0.2rem" }} />
      ADD MORE
    </button>
  );
};
