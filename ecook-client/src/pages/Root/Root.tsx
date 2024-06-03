import "./Root.css";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { LabelsContext } from "../../contexts/LabelsContext";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getLabels } from "../../utils/api";

export const Root = () => {
  const [labels, setLabels] = useState<Array<string>>(["all"]);

  useEffect(() => {
    getLabels()
      .then((data) => {
        const labelsName = data?.map((label) => label.name);
        setLabels(["all", ...labelsName]);
      })
      .catch((e) => console.error(isAxiosError(e) ? e.response?.data : e));
  }, []);

  return (
    <div className="root">
      <Header />
      <LabelsContext.Provider value={{ labels }}>
        <Outlet />
      </LabelsContext.Provider>
    </div>
  );
};
