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
import { Trash } from "lucide-react";
import { useState } from "react";
import { useCategoryContext } from "@/context/useCategoryContext";

interface DeleteCategoryDialogProps {
  id: number;
  name: string;
}

const DeleteCategoryDialog = ({ id, name }: DeleteCategoryDialogProps) => {
  const { deleteCategory } = useCategoryContext();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteCategory(id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Kategori</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          Apakah kamu yakin ingin menghapus kategori <strong>{name}</strong>?
          Tindakan ini tidak dapat dibatalkan.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Batal
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
