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
import { PlusCircle } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { TaskDataSchema } from "@/schema/task.schema";
import { useState } from "react";
import { useTaskContext } from "@/context/useTaskContext";
import { useCategoryContext } from "@/context/useCategoryContext";

const DialogNewTask = () => {
  const { createTask } = useTaskContext();
  const { categories } = useCategoryContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState<TaskDataSchema>({
    title: "",
    description: "",
    deadline: "",
    priority: "MEDIUM",
    status: "PENDING",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedTask: TaskDataSchema = {
      ...taskData,
      categoryId: selectedCategoryId,
      deadline: taskData.deadline
        ? new Date(taskData.deadline).toISOString()
        : undefined,
    };

    await createTask(formattedTask);
    setTaskData({
      title: "",
      description: "",
      deadline: "",
      priority: "MEDIUM",
      status: "PENDING",
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} className="w-auto px-2">
          <PlusCircle /> Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Task Baru</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 my-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 my-2">
            <Label>Deskripsi</Label>
            <Textarea
              name="description"
              placeholder="Optional"
              value={taskData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 my-2">
            <Label>Deadline</Label>
            <Input
              name="deadline"
              type="date"
              value={taskData.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 my-2">
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

          {/* <div className="space-y-2 my-2">
            <div className="space-y-2 my-2">
              <Label>Kategori Baru</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Nama kategori"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button
                  type="button"
                  onClick={async () => {
                    if (!newCategoryName) return;
                    await createCategory(newCategoryName);
                    setNewCategoryName("");
                  }}
                >
                  Tambah
                </Button>
              </div>
            </div>
          </div> */}

          <div className="space-y-2 my-2">
            <Label>Pilih Kategori</Label>
            <Select
              onValueChange={(value) => setSelectedCategoryId(Number(value))}
              value={selectedCategoryId?.toString()}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">Tambah</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewTask;
