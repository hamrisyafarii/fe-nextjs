import { useState } from "react";
import { useComments } from "@/hooks/use-comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  taskId: number;
}

const CommentForm = ({ taskId }: Props) => {
  const { createComment } = useComments(taskId);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    await createComment(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentar..."
        rows={3}
      />
      <Button type="submit">Kirim</Button>
    </form>
  );
};

export default CommentForm;
