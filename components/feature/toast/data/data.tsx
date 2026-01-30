"use client";

import { ToastType } from "../type/type";

import {
  RiInformationFill,
  RiAlarmWarningFill,
  RiThumbUpFill,
  RiAlertFill,
} from "@remixicon/react";

export const ToastColorChart: Record<ToastType, string> = {
  info: "text-indigo-500",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-amber-600",
};

export const ButtonColorChart: Record<ToastType, string> = {
  info: "text-indigo-400",
  error: "text-red-500",
  success: "text-green-500",
  warning: "text-amber-500",
};
export const BgrChart: Record<ToastType, string> = {
  info: "!bg-[#EEF2FF] border !border-[#C7D2FE]",
  error: "!bg-[#FEF2F2] border !border-[#FECACA]",
  success: "!bg-[#F0FDF4] border !border-[#BBF7D0]",
  warning: "!bg-[#FFFBEB] border !border-[#FDE68A]",
};

export const ToastIconChart: Record<ToastType, React.ReactNode> = {
  info: <RiInformationFill size={20} />,
  error: <RiAlarmWarningFill size={20} />,
  success: <RiThumbUpFill size={20} />,
  warning: <RiAlertFill size={20} />,
};
