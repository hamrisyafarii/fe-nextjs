import { useAuth } from "@/hooks/use-auth";
import { CheckCircle, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "@/hooks/use-session";

const Header = () => {
  const { logout } = useAuth();
  const { token } = useSession();
  return (
    <header className="bg-gray-400 flex justify-between items-center py-2 px-2 md:px-8 sticky z-50 top-0">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">TugasKu</span>
      </div>

      <div>
        {token && (
          <Button size="icon" variant="destructive" onClick={logout}>
            <LogOut />
          </Button>
        )}
      </div>
    </header>
  );
};
export default Header;
