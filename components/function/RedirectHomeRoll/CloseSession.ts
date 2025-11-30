import { ManagmentStorage } from "@/components/Services/ManagmentStorage/ManagmentStorage"
import { goToPath } from "./GoToPath";

export const CloseSession = () => {
    ManagmentStorage.clear();
    goToPath('/')
}

