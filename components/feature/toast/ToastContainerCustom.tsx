"use client";

import { ToastContainer } from "react-toastify";
import { ToastType } from "./type/type";
import { ToastColorChart, ToastIconChart } from "./data/data";
import clsx from "clsx";

export const ToastContainerCustom = () => {
  return (
    <ToastContainer
      hideProgressBar
      icon={({ type }) => {
        if (!type) return null;

        return (
          <span className={clsx("relative top-[1px] mr-1", ToastColorChart[type as ToastType])}>
            {ToastIconChart[type as ToastType]}
          </span>
        );
      }}
    />
  );
};
