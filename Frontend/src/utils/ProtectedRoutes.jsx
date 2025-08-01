import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoutes = () => {
  const { user, isInitialCheckDone } = useAuth();

  // Don't decide until the initial auth check is complete
  if (!isInitialCheckDone) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-200" />
      </div>
    );
  }

  // Once checked, allow or deny access
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;