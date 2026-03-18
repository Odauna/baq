import { toast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning" | "default";
export const Msg = (
    type: ToastType,
    message: string
) => {
    switch (type) {
        case "success":
            toast.success(message);
        case "error":
            toast.error(message);
        case "info":
            toast.info(message);
        case "warning":
            toast.warning(message);
        case "default":
            toast(message);
    }
}