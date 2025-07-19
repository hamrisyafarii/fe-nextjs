import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { format } from "date-fns";
import { Info } from "lucide-react";
import CommentList from "@/components/Fragments/comments/CommentList";
import CommentForm from "@/components/Fragments/comments/CommentForm";

interface TaskDetailModalProps {
  task: {
    id: number;
    title: string;
    description?: string;
    deadline?: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  };
}

const isOverdue = (deadline: string) => {
  if (!deadline) return false;
  const today = new Date();
  const taskDeadline = new Date(deadline);
  return taskDeadline < today;
};

const TaskDetailModal = ({ task }: TaskDetailModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Detail Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-sm text-muted-foreground">
              {task.description || "Tidak ada deskripsi"}
            </p>
          </div>

          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">Deadline:</span>{" "}
              {task.deadline ? isOverdue(task.deadline) : "Tidak ditentukan"}
            </p>
            <p>
              <span className="font-medium">Priority:</span>{" "}
              <Badge variant="outline">{task.priority}</Badge>
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <Badge variant="secondary">{task.status}</Badge>
            </p>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-semibold mb-2">Komentar</h3>
            <CommentForm taskId={task.id} />
            <CommentList taskId={task.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;
