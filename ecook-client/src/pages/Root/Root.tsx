import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./Root.css";
import { LabelsContext } from "./LabelsContext";
import { useState } from "react";

export const Root = () => {
  const [labels, setLabels] = useState<Array<string>>([
    "all",
    "thai",
    "asian",
    "western",
    "dessert",
    "others",
  ]);

  return (
    <div className="root">
      <Header />
      <LabelsContext.Provider value={{ labels }}>
        <Outlet />
      </LabelsContext.Provider>
    </div>
  );
};