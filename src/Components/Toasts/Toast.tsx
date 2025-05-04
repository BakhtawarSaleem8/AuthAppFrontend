import React, { useState, forwardRef, useImperativeHandle, ForwardedRef } from "react";
import "./toast.css";

// Define the props type for the component
interface ReactToastProps {
  timeout?: number; // Optional timeout prop
}

// Define the ref type for the component
export interface ReactToastRef {
  showToast: (msg?: string, type?: ToastType) => void; // Method exposed via ref
}

// Define the toast type (for different colors)
type ToastType = "success" | "error" | "warning" | "info";

// Define the state type
interface ToastState {
  show: boolean;
  toastMsg: string;
  toastType: ToastType;
}

// Define the component with TypeScript
const ReactToast = (
  { timeout = 1500 }: ReactToastProps, // Destructure props with default timeout
  ref: ForwardedRef<ReactToastRef> // Forwarded ref with ReactToastRef type
) => {
  // Use a single useState to manage all state
  const [toastState, setToastState] = useState<ToastState>({
    show: false,
    toastMsg: "",
    toastType: "info",
  });

  // Expose the showToast method via ref
  useImperativeHandle(ref, () => ({
    showToast(msg = "", type: ToastType = "info") {
      // Update all state at once
      setToastState({
        show: true,
        toastMsg: msg,
        toastType: type,
      });

      // Hide the toast after the timeout
      setTimeout(() => {
        setToastState((prevState) => ({ ...prevState, show: false }));
      }, timeout);
    },
  }));

  // Determine the CSS class based on the toast type
  const toastClassName = `react-toast-container ${toastState.show ? "show" : ""} ${toastState.toastType}`;

  return (
    <div className={toastClassName}>
      {toastState.toastMsg}
    </div>
  );
};

// Export the component with forwardRef
export default forwardRef<ReactToastRef, ReactToastProps>(ReactToast);