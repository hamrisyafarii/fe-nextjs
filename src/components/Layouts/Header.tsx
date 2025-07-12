import { CheckCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";

interface HeaderProps {
  type: string;
  onLogout: () => void;
}

const Header = ({ onLogout, type }: HeaderProps) => {
  const { token } = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await onLogout();
    setLoading(false);
  };
  return (
    <header className="bg-background border-b border-foreground flex justify-between items-center py-2 px-2 md:px-8 sticky z-50 top-0">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-primary-foreground" />
        </div>
        <Link href="#" className="text-xl font-bold text-foreground">
          TugasKu
        </Link>
      </div>

      <div>
        {type === "dashboard" && token && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <LogOut />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Kamu yakin ingin keluar?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {loading ? "memuat" : "Keluar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </header>
  );
};
export default Header;
