import { createContext } from "react";

export const labels: Array<string> = [];

export const LabelsContext = createContext<{
  labels: Array<string>;
}>({ labels: [] });
