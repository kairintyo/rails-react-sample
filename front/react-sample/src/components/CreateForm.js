import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

function CreateForm(props) {
  return (
    <form>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            label="title"
            id="title"
            value={props.inputs["title"]}
            onChange={(e) => props.onChange("title", e)}
          />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <TextField
            label="content"
            id="content"
            multiline
            fullWidth
            value={props.inputs["content"]}
            onChange={(e) => props.onChange("content", e)}
          />
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={12}>
          <Box mt={5}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={props.onSubmit}
            >
              CREATE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateForm;
