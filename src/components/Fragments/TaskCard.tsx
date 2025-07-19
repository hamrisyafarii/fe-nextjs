import {
  AlertCircle,
  Archive,
  Calendar,
  CheckCircle,
  Plus,
  Star,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskContext } from "@/context/useTaskContext";
import { ActionDropdown } from "@/components/Fragments/tasks/ActionDropdown";
import { TaskDataSchema } from "@/schema/task.schema";
import React, { useState } from "react";
import { EditTaskSheet } from "@/components/Fragments/tasks/EditTaskSheet";
import DeleteTaskDialog from "@/components/Fragments/DeleteTaskDialog";

const TaskCard = () => {
  const { tasks, editTask, deleteTask } = useTaskContext();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDataSchema | null>(null);

  const handleEdit = (task: TaskDataSchema) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Gagal menghapus task:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isOverdue = (deadline: string) => {
    if (!deadline) return false;
    const today = new Date();
    const taskDeadline = new Date(deadline);
    return taskDeadline < today;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-background rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
          >
            {/* Card Header */}
            <div className="p-6 pb-4 ">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Select
                      value={task.status}
                      onValueChange={(value) =>
                        editTask(task.id!, {
                          ...task,
                          status: value.toUpperCase() as typeof task.status,
                        })
                      }
                    >
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority || "medium"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {task.isFavorite && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                  {task.isArchived && (
                    <Archive className="h-4 w-4 text-gray-500" />
                  )}

                  <ActionDropdown
                    onEdit={() => handleEdit(task)}
                    deleteComponent={
                      <DeleteTaskDialog
                        taskId={task.id!}
                        onDelete={handleDelete}
                      />
                    }
                  />

                  {selectedTask && (
                    <EditTaskSheet
                      task={selectedTask}
                      open={isEditOpen}
                      setOpen={setIsEditOpen}
                    />
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                {task.title}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                {task.description}
              </p>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 ">
              <div className="flex items-center justify-between text-sm ">
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4" />
                  <span
                    className={
                      isOverdue(task.deadline!)
                        ? "text-red-600 font-medium"
                        : ""
                    }
                  >
                    {formatDate(task.deadline!) || "No deadline"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      task.status
                    )}`}
                  ></div>
                  <span className="text-foreground capitalize text-xs">
                    {task.status || "pending"}
                  </span>
                </div>
              </div>

              {isOverdue(task.deadline!) && (
                <div className="mt-2 flex items-center gap-1 text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  <span className="text-xs font-medium">Overdue</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full">
          <div className="bg-background rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Belum ada task dibuat
            </h3>
            <p className="text-muted-foreground mb-6">
              Mulai dengan membuat task pertama Anda untuk mengorganisir
              pekerjaan dengan lebih baik.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors duration-200">
              <Plus className="h-5 w-5" />
              Buat Task Pertama
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TaskCard;
