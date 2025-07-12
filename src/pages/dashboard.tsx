import DeleteCategoryDialog from "@/components/Fragments/DeleteCategoryDialog";
import DialogNewTask from "@/components/Fragments/DialogNewTask";
import StatsCards from "@/components/Fragments/StatsCards";
import TaskCard from "@/components/Fragments/TaskCard";
import EditCategoryDialog from "@/components/Fragments/UpdateCategoryDialog";
import withAuth from "@/components/hoc/withAuth";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import { useCategoryContext } from "@/context/useCategoryContext";
import { useAuth } from "@/hooks/use-auth";
import { useTasks } from "@/hooks/use-task";
import { AlertCircle, FolderOpen } from "lucide-react";

const Dashboard = () => {
  const { error } = useTasks();
  const { categories } = useCategoryContext();
  const { logout } = useAuth();

  return (
    <>
      <Header onLogout={logout} type="dashboard" />

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
              <DialogNewTask />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Kategori Task
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Organisir task berdasarkan kategori
                  </p>
                </div>
              </div>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm hover:shadow-md">
                <DialogNewTask />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="group relative bg-card border border-border/40 rounded-xl p-6 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-1"></div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-chart-1 opacity-60"></div>

                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {cat.name}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <EditCategoryDialog
                            id={cat.id}
                            currentName={cat.name}
                          />
                          <DeleteCategoryDialog id={cat.id} name={cat.name} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full">
                  <div className="bg-card border border-border/40 rounded-xl p-12 text-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Belum ada kategori
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Mulai dengan membuat kategori pertama untuk mengorganisir
                      task Anda
                    </p>
                  </div>
                </div>
              )}
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
