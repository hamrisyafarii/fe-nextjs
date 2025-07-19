import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Edit3 } from "lucide-react";
import { TaskDataSchema } from "@/schema/task.schema";
import { useState } from "react";
import { useTaskContext } from "@/context/useTaskContext";

interface Props {
  task: TaskDataSchema;
}

const EditTaskDialog = ({ task }: Props) => {
  const { editTask } = useTaskContext();
  const [open, setOpen] = useState(false);

  const [taskData, setTaskData] = useState<TaskDataSchema>({
    ...task,
    deadline: task.deadline
      ? new Date(task.deadline).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: TaskDataSchema = {
      ...taskData,
      deadline: taskData.deadline
        ? new Date(taskData.deadline).toISOString()
        : undefined,
    };
    await editTask(task.id!, updatedTask);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Edit3 className="text-green-500" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 my-2 px-4">
            <Label>Title</Label>
            <Input
              name="title"
              value={taskData.title}
              onChange={handleChange}
            />

            <Label>Description</Label>
            <Textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
            />

            <Label>Deadline</Label>
            <Input
              name="deadline"
              type="date"
              value={taskData.deadline}
              onChange={handleChange}
            />

            <Label>Priority</Label>
            <Select
              value={taskData.priority}
              onValueChange={(value) =>
                setTaskData((prev) => ({
                  ...prev,
                  priority: value.toUpperCase() as TaskDataSchema["priority"],
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="p-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
