import React from "react";
import "./Dropdown.css";
import { RecipeAction } from "../../contexts/RecipeContext";

type DropdownProps = {
  state: number;
  setState: (state: number) => void | React.Dispatch<RecipeAction>;
};

export const Dropdown = (props: DropdownProps) => {
  const renderServings = (range: number) => {
    const lists = [];
    for (let i = 1; i <= range; i++) {
      lists.push(
        <li key={i} onClick={() => props.setState(i)}>
          {i}
        </li>
      );
    }
    return lists;
  };
  return (
    <div className="dropdown">
      <button className="dropbtn">{props.state}</button>
      <ul className="dropdown-content">{renderServings(10)}</ul>
    </div>
  );
};
