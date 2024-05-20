import "./Root.css";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { LabelsContext } from "./LabelsContext";
import { useEffect, useState } from "react";
import { sampleLabels } from "../../utils/data";

export const Root = () => {
  const [labels, setLabels] = useState<Array<string>>(["all"]);

  useEffect(() => setLabels(sampleLabels), []);

  return (
    <div className="root">
      <Header />
      <LabelsContext.Provider value={{ labels }}>
        <Outlet />
      </LabelsContext.Provider>
    </div>
  );
};
