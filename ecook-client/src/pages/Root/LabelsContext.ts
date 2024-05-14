import { createContext } from "react";

export const LabelsContext = createContext<{
  labels: Array<string>;
}>({ labels: [] });
