import { createContext } from "react";

export const labels: Array<string> = [
  "all",
  "thai",
  "asian",
  "western",
  "dessert",
];

export const LabelsContext = createContext<{
  labels: Array<string>;
}>({ labels: labels });
