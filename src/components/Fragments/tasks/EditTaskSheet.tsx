import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskDataSchema } from "@/schema/task.schema";
import { useState } from "react";
import { useTaskContext } from "@/context/useTaskContext";

interface Props {
  task: TaskDataSchema;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditTaskSheet({ task, open, setOpen }: Props) {
  const { editTask } = useTaskContext();

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Task</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit}>
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
          <div className="px-4 mt-4">
            <Button type="submit" className="w-full">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
