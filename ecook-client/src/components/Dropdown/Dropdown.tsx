import "./Dropdown.css";

type DropdownProps = {
  state: number;
  setState: (state: number) => void;
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
      <button className="dropbtn">{props.state ?? 1}</button>
      <ul className="dropdown-content">{renderServings(20)}</ul>
    </div>
  );
};
