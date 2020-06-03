import React from "react";

import { Avatar, makeStyles } from "@material-ui/core";

import { MovieComment } from "../../containers/CommentsList/CommentsList";

interface CommentProps {
  commentData: MovieComment;
}

const useStyles = makeStyles((theme) => ({
  commentWrapper: {
    display: "flex",
    margin: "15px 5px",
    "& p": {
      padding: "0px 10px",
      fontSize: 14,
    },
    "& .MuiAvatar-circle": {
      marginTop: 5,
    },
  },
  commentContentWrapper: {
    marginLeft: 10,
    backgroundColor: "rgb(66, 79, 178)",
    color: "white",
  },
}));

const Comment: React.FC<CommentProps> = (props: CommentProps) => {
  const { commentData } = props;

  const classes = useStyles();

  return (
    <div className={classes.commentWrapper}>
      <Avatar src={commentData.user.photo}></Avatar>
      <div className={classes.commentContentWrapper}>
        <p>{commentData.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
