import { clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const notify = (text, time, type, theme) => {
  toast(text, {
    autoClose: time,
    type: type,
    theme: theme,
  });
};
