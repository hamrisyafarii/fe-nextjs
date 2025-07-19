import { useComments } from "@/hooks/use-comment";

interface Props {
  taskId: number;
}

const CommentList = ({ taskId }: Props) => {
  const { comments, loading } = useComments(taskId);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="space-y-3 mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-muted p-3 rounded">
          <p className="text-sm">{comment.content}</p>
          <span className="text-xs text-gray-500">{comment.createdAt}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
