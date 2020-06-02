import React, { useEffect, useState } from "react";
import {
  Modal,
  makeStyles,
  Typography,
  Paper,
  IconButton,
  InputBase,
} from "@material-ui/core";
import { fbDb } from "../../services/firebase";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import InfoIcon from '@material-ui/icons/Info';

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
    width: 450,
  },
  titleHeader: {
    display: "flex",
    backgroundColor: "rgb(66, 79, 178)",
    padding: "7px 10px",
    color: "white",
    "& h6": {
      paddingLeft: 15,
      fontSize: 16,
    },
    "& svg": {
      cursor: "pointer",
    },
  },
  commentsContainer: {
    backgroundColor: "rgb(242, 242, 242)",
    padding: 10,
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  notFoundWrapper: {
    display: 'flex',
    justifyContent: 'center',
    color: "#777",
    margin: "10px 0px",
    "& p": {
      margin: 2,
    },
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
        <div className={classes.titleHeader}>
          <ArrowBackIcon onClick={handleClose} />
          <Typography variant="subtitle1">{movieTitle} Comments</Typography>
        </div>
        <div className={classes.commentsContainer}>
          {comments.length > 0 ? comments.map((comment) => (
            <Comment key={comment.timestamp} commentData={comment} />
          )) : <div className={classes.notFoundWrapper}><InfoIcon /><p>No comments found</p></div>}
        </div>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Add your comment"
            inputProps={{ "aria-label": "add your comment" }}
          />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </Modal>
  );
};

export default CommentsList;
