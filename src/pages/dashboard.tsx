import ActionDropdownCategory from "@/components/Fragments/category/ActionDropdownCategory";
import DeleteCategoryDialog from "@/components/Fragments/category/DeleteCategoryDialog";
import DialogNewTask from "@/components/Fragments/tasks/DialogNewTask";
import StatsCards from "@/components/Fragments/StatsCards";
import TaskCard from "@/components/Fragments/tasks/TaskCard";
import EditCategoryDialog from "@/components/Fragments/category/UpdateCategoryDialog";
import withAuth from "@/components/hoc/withAuth";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import { Badge } from "@/components/ui/badge";
import { Category, useCategoryContext } from "@/context/useCategoryContext";
import { useAuth } from "@/hooks/use-auth";
import { useTasks } from "@/hooks/use-task";
import { AlertCircle, FolderOpen } from "lucide-react";
import { useState } from "react";
import DialogNewCategory from "@/components/Fragments/category/DialogNewCategory";

const Dashboard = () => {
  const { error } = useTasks();
  const { categories } = useCategoryContext();
  const [selectedComment, setSelectedComment] = useState<Category | null>(null);
  const [openComment, setOpenComment] = useState(false);
  const { logout } = useAuth();

  const handleEditComment = (category: Category) => {
    setSelectedComment(category);
    setOpenComment(true);
  };

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
                  <h2 className="text-md font-bold text-foreground">
                    Kategori Task
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Organisir task berdasarkan kategori
                  </p>
                </div>
              </div>
              <DialogNewCategory />
            </div>

            <div className="flex gap-4">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category.id}>
                    <Badge variant={"outline"}>
                      {category.name}
                      <ActionDropdownCategory
                        onEdit={() => handleEditComment(category)}
                        deleteComponent={
                          <DeleteCategoryDialog
                            id={category.id}
                            name={category.name}
                          />
                        }
                      />

                      {selectedComment && (
                        <EditCategoryDialog
                          open={openComment}
                          setOpen={setOpenComment}
                          currentName={category.name}
                          id={category.id}
                        />
                      )}
                    </Badge>
                  </div>
                ))
              ) : (
                <div>belum ada kategori yang dibuat</div>
              )}
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.length > 0 &&
                categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="group relative bg-card border border-border/40 rounded-xl p-6 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <EditCategoryDialog id={cat.id} currentName={cat.name} />
                      <DeleteCategoryDialog id={cat.id} name={cat.name} />
                    </div>
                  </div>
                ))}
            </div> */}
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
