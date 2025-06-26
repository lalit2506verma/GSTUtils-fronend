import { toast, type ToastOptions } from "react-toastify"

export const showToast = (message:string, type: ToastOptions['type']) => {
    toast(message, {type})
}