import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DebounceFunction {
  (...args: any[]): void;
}

export const debounce = <T extends DebounceFunction>(
  func: T,
  wait: number
): T => {
  let timerId: ReturnType<typeof setTimeout>;

  return ((...args: Parameters<T>) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, wait);
  }) as T;
};
