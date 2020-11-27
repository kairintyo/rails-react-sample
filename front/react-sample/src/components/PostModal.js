import React from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    height: 500,
    backgroundColor: "#d9ded9",
    border: "0.5px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PostModal(props) {
  const classes = useStyles();
  const modalStyle = getModalStyle();

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>{props.post.title}</h2>
      <p>{props.post.content}</p>
      <p>作成日時：{props.post.created_at}</p>
      <p>更新日時：{props.post.updated_at}</p>
      <Grid item xs={4}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => {
            props.onEditClick();
            props.onClose();
          }}
        >
          EDIT
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={(e) => props.onDelete(props.post.id, e)}
        >
          DELETE
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Button size="small" variant="contained" onClick={props.onClose}>
          CLOSE
        </Button>
      </Grid>
    </div>
  );

  return (
    <Modal open={props.open} onClose={props.onClose}>
      {body}
    </Modal>
  );
}

export default PostModal;
