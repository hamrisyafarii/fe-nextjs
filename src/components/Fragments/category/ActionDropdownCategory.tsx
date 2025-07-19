import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil } from "lucide-react";
import React from "react";

interface ActionMenuProps {
  onEdit: () => void;
  deleteComponent: React.ReactNode;
}

const ActionDropdownCategory = (props: ActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="space-y-2 ">
        <DropdownMenuItem onClick={props.onEdit} className="w-full">
          <Pencil className="mx-1" /> Edit
        </DropdownMenuItem>
        {props.deleteComponent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ActionDropdownCategory;
