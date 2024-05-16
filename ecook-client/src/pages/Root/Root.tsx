import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./Root.css";
import { LabelsContext, labels } from "../../contexts/LabelsContext";

export const Root = () => {
  return (
    <div className="root">
      <Header />
      <LabelsContext.Provider value={{ labels }}>
        <Outlet />
      </LabelsContext.Provider>
    </div>
  );
};
