import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PostModal from "./PostModal";
import EditForm from "./EditForm";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      editFormOpen: false,
      editFormInputs: {
        title: "",
        content: "",
      },
    };

    this.handleToggelModalOpen = this.handleToggelModalOpen.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToggleEditFormOpen = this.handleToggleEditFormOpen.bind(this);
  }

  handleToggelModalOpen() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  handleInputChange(itemName, e) {
    const newInputs = Object.assign({}, this.state.editFormInputs);
    newInputs[itemName] = e.target.value;
    this.setState({
      editFormInputs: newInputs,
    });
  }

  handleToggleEditFormOpen() {
    this.setState({
      editFormOpen: !this.state.editFormOpen,
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="h3" component="h3">
              {this.props.post.title}
            </Typography>
            <Typography variant="body2">{this.props.post.content}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={this.handleToggelModalOpen}
            >
              DETAIL
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.handleToggleEditFormOpen}
            >
              EDIT
            </Button>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={(e) => this.props.onDelete(this.props.post.id, e)}
            >
              DELETE
            </Button>
          </CardActions>
        </Card>
        <PostModal
          post={this.props.post}
          open={this.state.modalOpen}
          onClose={this.handleToggelModalOpen}
          onDelete={this.props.onDelete}
          onEditClick={this.handleToggleEditFormOpen}
        />
        {this.state.editFormOpen && (
          <EditForm
            post={this.props.post}
            inputs={this.state.editFormInputs}
            onChange={this.handleInputChange}
            onSubmit={this.props.onUpdate}
          />
        )}
      </div>
    );
  }
}

export default Post;
