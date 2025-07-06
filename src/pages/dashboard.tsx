import StatsCards from "@/components/Fragments/StatsCards";
import TaskCard from "@/components/Fragments/TaskCard";
import withAuth from "@/components/hoc/withAuth";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import { useTasks } from "@/hooks/use-task";
import { AlertCircle, Plus } from "lucide-react";

const Dashboard = () => {
  const { error } = useTasks();

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br bg-background py-8">
        {error && (
          <div className="max-w-7xl mx-auto px-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Dashboard Tasks
                </h1>
                <p className="text-foreground">
                  Kelola semua task Anda dengan mudah
                </p>
              </div>
              <button className="bg-chart-1 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
                <Plus className="h-5 w-5" />
                Tambah Task
              </button>
            </div>
          </div>

          <StatsCards />

          <TaskCard />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default withAuth(Dashboard);
