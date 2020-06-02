import React, { useEffect, useState } from "react";
import { Modal, Fade, makeStyles, Backdrop } from "@material-ui/core";
import { fbDb } from "../../services/firebase";

import Comment from "../../components/Comment/Comment";

interface CommentsListProps {
  open: boolean;
  handleClose(): void;
  movieId: string;
  movieTitle: string;
}

export interface FirebaseUser {
  name: string;
  photo: string;
}

export interface MovieComment {
  comment: string;
  timestamp: number;
  user: FirebaseUser;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
}));

const CommentsList: React.FC<CommentsListProps> = (
  props: CommentsListProps
) => {
  const { movieId, handleClose, open, movieTitle } = props;
  const classes = useStyles();

  const [comments, setComments] = useState<MovieComment[]>([]);

  useEffect(() => {
    if (movieId) {
      const commentRef = fbDb.ref(`/comments/${movieId}`);

      commentRef.on("value", (commentsSnap) => {
        if (commentsSnap.exists()) {
          const keyComments = commentsSnap.val();
          const arrayComments = Object.entries(keyComments);
          const comments = arrayComments.map(
            (comment) => comment[1]
          ) as MovieComment[];
          console.log({ comments });
          setComments(comments);
        } else {
          console.log("No data at:", commentsSnap.key);
          setComments([]);
        }
      });
    }

    return function cleanup() {
      if (movieId) fbDb.ref(`/comments/${movieId}`).off();
    };
  }, [movieId]);

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <p id="transition-modal-description">{movieTitle}</p>
        <div>
          {comments.map((comment) => (
            <Comment key={comment.timestamp} commentData={comment} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CommentsList;
