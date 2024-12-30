"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CircleCheck, SlidersHorizontal } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        symbol,
        ...props
      }) {
        return (
          <Toast className="" key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <div className="flex gap-2">
                  {symbol == "check" && <CircleCheck color="#008000" />}
                  {symbol == "filter" && <SlidersHorizontal />}
                  <ToastTitle className="my-auto">{title}</ToastTitle>
                </div>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
