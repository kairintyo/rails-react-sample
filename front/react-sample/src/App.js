import React from "react";
import "./App.css";
import Box from "@material-ui/core/Box";
import CreateForm from "./components/CreateForm";
import Grid from "@material-ui/core/Grid";
import Post from "./components/Post";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createFormInputs: {
        title: "",
        content: "",
      },
      posts: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);
  }

  get axios() {
    const axiosBase = require("axios");
    return axiosBase.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      responseType: "json",
    });
  }

  componentDidMount() {
    this.axios
      .get("/posts")
      .then((results) => {
        console.log(results);
        this.setState({
          posts: results.data,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleInputChange(itemName, e) {
    const newInputs = Object.assign({}, this.state.createFormInputs);
    newInputs[itemName] = e.target.value;

    this.setState({
      createFormInputs: newInputs,
    });
  }

  handlePostSubmit(e) {
    e.preventDefault();
    const inputValues = Object.values(this.state.createFormInputs);

    if (inputValues.every((value) => value)) {
      this.axios
        .post("/posts", {
          post: this.state.createFormInputs,
        })
        .then((res) => {
          const posts = this.state.posts.slice();
          posts.push(res["data"]);
          this.setState({
            posts: posts,
            createFormInputs: {
              title: "",
              content: "",
            },
          });
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }

  handlePostDelete(id, e) {
    e.preventDefault();
    this.axios
      .delete(`/posts/${id}`)
      .then((res) => {
        const targetIndex = this.state.posts.findIndex((post) => {
          return post["id"] === res["data"]["id"];
        });
        const posts = this.state.posts.slice();
        posts.splice(targetIndex, 1);

        this.setState({
          posts: posts,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handlePostUpdate(id, inputs, e) {
    e.preventDefault();
    const inputValues = Object.values(inputs);

    if (inputValues.every((value) => value)) {
      this.axios
        .patch(`/posts/${id}`, {
          post: inputs,
        })
        .then((results) => {
          const posts = this.state.posts.slice();
          const index = posts.findIndex((post) => post["id"] === id);
          posts.splice(index, 1, results["data"]);

          this.setState({
            posts: posts,
          });
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }

  getPosts() {
    return this.state.posts.map((post) => {
      return (
        <Grid item xs={4} key={post.id}>
          <Post
            post={post}
            onDelete={this.handlePostDelete}
            onUpdate={this.handlePostUpdate}
          />
        </Grid>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <Box p={5}>
          <CreateForm
            inputs={this.state.createFormInputs}
            onChange={this.handleInputChange}
            onSubmit={this.handlePostSubmit}
          />
          <Box p={3}>
            <Grid container spacing={4}>
              {this.getPosts()}
            </Grid>
          </Box>
        </Box>
      </div>
    );
  }
}

export default App;
