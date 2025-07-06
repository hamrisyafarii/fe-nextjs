import { useTasks } from "@/hooks/use-task";
import { CheckCircle, Clock, Star } from "lucide-react";

const StatsCards = () => {
  const { tasks } = useTasks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-chart-2 rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-background">Total Tasks</p>
            <p className="text-2xl font-bold text-background">{tasks.length}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-chart-4 rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-background">Completed</p>
            <p className="text-2xl font-bold text-background">
              {
                tasks.filter(
                  (task) => task.status?.toLowerCase() === "completed"
                ).length
              }
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-chart-2 rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-background">In Progress</p>
            <p className="text-2xl font-bold text-background">
              {
                tasks.filter(
                  (task) => task.status?.toLowerCase() === "in-progress"
                ).length
              }
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-chart-3 rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-background">Favorites</p>
            <p className="text-2xl font-bold text-background">
              {tasks.filter((task) => task.isFavorite).length}
            </p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatsCards;
