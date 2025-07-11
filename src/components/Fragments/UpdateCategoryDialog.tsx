import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useCategoryContext } from "@/context/useCategoryContext";

interface EditCategoryDialogProps {
  id: number;
  currentName: string;
}

const EditCategoryDialog = ({ id, currentName }: EditCategoryDialogProps) => {
  const [name, setName] = useState(currentName);
  const [open, setOpen] = useState(false);
  const { updateCategory } = useCategoryContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCategory(id, name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Kategori</DialogTitle>
          </DialogHeader>

          <div className="space-y-2 mt-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kategori"
              required
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
