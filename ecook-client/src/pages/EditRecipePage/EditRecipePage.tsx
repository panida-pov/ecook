import { IoCaretBack } from "react-icons/io5";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useNavigate } from "react-router-dom";

export const EditRecipePage = () => {
  const navigate = useNavigate();

  return (
    <div className="outer-container recipe-page">
      <div className="button-container">
        <button className="button" onClick={() => navigate("/recipes/all")}>
          <IoCaretBack style={{ fontSize: "1.1rem" }} />
          BACK TO RECIPES
        </button>
        <div className="button-group">
          <button className="button">CANCEL</button>
          <button className="button">
            SAVE
            <SaveOutlinedIcon
              style={{ fontSize: "1.1rem", marginLeft: "0.2rem" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
