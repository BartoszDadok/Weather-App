import { BaseToastProps } from "react-native-toast-message";
import { ToastMessage } from "./ToastMessage";

const toastConfig = {
  success: ({ text1: successMessage }: BaseToastProps) => (
    <ToastMessage status="success" message={successMessage} />
  ),

  error: ({ text1: errorMessage }: BaseToastProps) => (
    <ToastMessage status="error" message={errorMessage} />
  ),
};

export { toastConfig };
