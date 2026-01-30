import { toast, ToastContentProps } from "react-toastify";
import { ToastType } from "./type/type";
import { ToastColorChart, ButtonColorChart, BgrChart } from "./data/data";
import { RiCloseLine } from "@remixicon/react";
import clsx from "clsx";

export const Toast = (type: ToastType, title: string, message?: string) => {
  toast(SplitButtons, {
    className: clsx("!pr-[40px] !items-start", BgrChart[type]),
    position: "top-right",
    closeButton: false,
    type: type,
    data: {
      title: title,
      message: message,
      varient: type,
    },
  });
};

type ToastData = {
  title: string;
  message?: string;
  varient: ToastType;
};

function SplitButtons({ closeToast, data }: ToastContentProps<ToastData>) {
  return (
    // using a grid with 3 columns
    <div className="grid w-full">
      <div className="flex flex-col">
        <h3 className={clsx("text-sm font-semibold", ToastColorChart[data.varient])}>
          {data.title}
        </h3>
        <p className="text-xs text-gray-700">{data.message}</p>
      </div>
      <button
        onClick={() => closeToast("reply")}
        className={clsx("absolute top-3 right-2", ButtonColorChart[data.varient])}
      >
        <RiCloseLine size={20} />
      </button>
    </div>
  );
}
