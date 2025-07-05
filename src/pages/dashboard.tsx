import withAuth from "@/components/hoc/withAuth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOutIcon } from "lucide-react";

const Dashboard = () => {
  const { logout } = useAuth();
  return (
    <>
      <div>
        <h1>This dashboard page</h1>
      </div>
      <Button onClick={logout}>
        <LogOutIcon />
      </Button>
    </>
  );
};
export default withAuth(Dashboard);
