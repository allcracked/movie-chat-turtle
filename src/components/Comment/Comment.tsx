import React from "react";
import { MovieComment } from "../../containers/CommentsList/CommentsList";
import { Avatar } from "@material-ui/core";

interface CommentProps {
  commentData: MovieComment;
}

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { commentData } = props;

  return (
    <div>
      <Avatar src={commentData.user.photo}></Avatar>
      <p>{commentData.comment}</p>
    </div>
  );
};

export default Comment;
