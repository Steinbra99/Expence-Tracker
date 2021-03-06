import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { shallowEqual } from "shouldcomponentupdate-children";

const styles = {
  gray: {
    color: "#c3cdd0"
  }
};

class AddTagForm extends React.Component {
  state = {
    tag: ""
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
  }

  handleChange = event => {
    this.setState({ tag: event.target.value });
  };

  // add tag
  onButtonClick = () => {
    const { tag } = this.state;
    if (tag.length === 0) {
      return false;
    }
    fetch(`/add-custom-tag`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token")
      },
      body: JSON.stringify({
        _id: this.props._id,
        tag: tag
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          this.setState({ tag: "" });
          this.props.loadUser(user);
        }
      })
      .catch(err => console.warn("unable to add tag"));
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          backgroundColor: "#343b64",
          padding: "1rem",
          color: "#fff",
          border: "none",
          borderRadius: 5
        }}
      >
        <div>Add New Tag</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <TextField
            id="input-new-tag"
            label="Tag"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.tag}
            InputProps={{
              classes: { input: classes.gray }
            }}
            InputLabelProps={{
              className: classes.gray
            }}
          />
          <Button
            variant="text"
            size="small"
            color="secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={this.onButtonClick}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

AddTagForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddTagForm);
