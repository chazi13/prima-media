import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ErrorResponseMeta } from "@/types/meta";

import { storageUrl } from "./const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseErrorMsg(
  error: Error,
  formatter?: (error: ErrorResponseMeta) => string,
) {
  try {
    const errJson = JSON.parse(error.message) as ErrorResponseMeta;

    if (formatter) {
      return formatter(errJson);
    }

    return errJson.message ?? "";
  } catch {
    return error.message;
  }
}

export function getIntial(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function mediaUrl(path: string) {
  if (!path || path === "undefined") {
    return undefined;
  }

  return storageUrl + path;
}

export function formatCurrency(
  amount: number,
  currency: string = "IDR",
  locale: string = "id-ID",
) {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatNumber(amount: number, locale: string = "id-ID") {
  return amount.toLocaleString(locale, {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export async function handleCopy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
