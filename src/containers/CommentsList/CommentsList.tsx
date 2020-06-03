import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  Modal,
  makeStyles,
  Typography,
  Paper,
  IconButton,
  InputBase,
} from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import InfoIcon from "@material-ui/icons/Info";
import CircularProgress from "@material-ui/core/CircularProgress";

import { RootState } from "../../store";
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
    overflowY: "auto",
    maxHeight: 700,
  },
  commentRoot: {
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
    display: "flex",
    justifyContent: "center",
    color: "#777",
    margin: "10px 0px",
    "& p": {
      margin: 2,
    },
  },
  loadingIcon: {
    margin: "0px auto",
    textAlign: "center",
  },
}));

const CommentsList: React.FC<CommentsListProps> = (
  props: CommentsListProps
) => {
  const { movieId, handleClose, open, movieTitle } = props;
  const classes = useStyles();

  const user = useSelector((state: RootState) => state.loggedUser.user);

  const [comments, setComments] = useState<MovieComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLocalClose = () => {
    fbDb.ref(`/comments/${movieId}`).off();
    handleClose();
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.currentTarget.value);
  };

  const handleSaveComment = () => {
    if (newComment) {
      const saveComment: MovieComment = {
        comment: newComment,
        timestamp: moment.now(),
        user: { name: user.name, photo: user.photo },
      };

      const movieRef = fbDb.ref(`/comments/${movieId}`);
      const commentPush = movieRef.push();
      const commentRef = commentPush.ref;

      commentRef.update({ ...saveComment });

      setNewComment("");
    }
  };

  const handleKeyDownComment = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") handleSaveComment();
  };

  useEffect(() => {
    if (movieId) {
      setLoading(true);
      const movieRef = fbDb.ref(`/comments/${movieId}`);

      movieRef.on("value", (commentsSnap) => {
        if (commentsSnap.exists()) {
          const keyComments = commentsSnap.val();
          const arrayComments = Object.entries(keyComments);

          const comments = arrayComments.map(
            (comment) => comment[1]
          ) as MovieComment[];

          comments.sort((a, b) => a.timestamp - b.timestamp);

          setComments(comments);
        } else {
          setComments([]);
        }

        setLoading(false);
      });
    }
  }, [movieId]);

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleLocalClose}
    >
      <div className={classes.paper}>
        <div className={classes.titleHeader}>
          <ArrowBackIcon onClick={handleLocalClose} />
          <Typography variant="subtitle1">{movieTitle} Comments</Typography>
        </div>
        <div className={classes.commentsContainer}>
          {loading ? (
            <div className={classes.loadingIcon}><CircularProgress /></div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.timestamp} commentData={comment} />
            ))
          ) : (
            <div className={classes.notFoundWrapper}>
              <InfoIcon />
              <p>No comments found</p>
            </div>
          )}
        </div>
        <Paper component="div" className={classes.commentRoot}>
          <InputBase
            className={classes.input}
            placeholder="Add your comment"
            inputProps={{ "aria-label": "add your comment" }}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDownComment}
            value={newComment}
          />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
            onClick={handleSaveComment}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </Modal>
  );
};

export default CommentsList;
