import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategoryContext } from "@/context/useCategoryContext";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const DialogNewCategory = () => {
  const { createCategory } = useCategoryContext();
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"secondary"} size={"icon"} className="w-auto px-2">
          <PlusCircle /> Kategori
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kateogri Task baru</DialogTitle>
        </DialogHeader>
        <form className="space-y-2">
          <div>
            <Label className="mb-2">Kategori</Label>
            <Input
              type="text"
              placeholder="Nama kategori"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>

          <Button
            type="button"
            onClick={async () => {
              if (!newCategory) return;
              await createCategory(newCategory);
              setNewCategory("");
              setOpen(false);
            }}
          >
            Tambah
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default DialogNewCategory;
