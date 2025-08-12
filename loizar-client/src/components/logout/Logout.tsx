import Swal from "sweetalert2";
import { useAuthStore } from "../../stores/useAuthStore";
import { LogOut } from "lucide-react";
import type { FC } from "react";

const Logout: FC = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async (): Promise<void> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      const {isSuccess, message} = await logout();

      if (isSuccess) {
        await Swal.fire({
          title: message,
          icon: "success",
          showConfirmButton: false,
          position: "center",
          timer: 1500,
        });
      } else {
        await Swal.fire({
          title: "Logout Failed",
          text: message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  return (
    <button onClick={handleLogout} className="flex items-center gap-3">
      <span>Logout</span>
      <LogOut className="w-5 h-5" />
    </button>
  );
};

export default Logout;
