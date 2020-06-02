import React from "react";
import { Modal, Fade, makeStyles, Backdrop } from "@material-ui/core";

interface CommentsListProps {
  open: boolean;
  handleClose(): void;
  movieId: string;
}

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const CommentsList: React.FC<CommentsListProps> = (
  props: CommentsListProps
) => {
  const { movieId, handleClose, open } = props;
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Transition modal</h2>
          <p id="transition-modal-description">
            {movieId}
          </p>
        </div>
      </Fade>
    </Modal>
  );
};

export default CommentsList;
