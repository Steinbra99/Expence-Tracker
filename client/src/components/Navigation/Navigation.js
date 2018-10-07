import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeOutlinedIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    fontWeight: 300
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  }
};

class Navigation extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render() {
    const { classes, isSignedIn, onRouteChange, onSignout } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List component="nav">
          <ListItem button onClick={() => this.props.onRouteChange("home")}>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>

        <Divider />

        <List component="nav">
          <ListItem button onClick={() => this.props.onRouteChange("profile")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>

        <Divider />

        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
        </List>
      </div>
    );

    if (isSignedIn) {
      return (
        <div className={classes.root}>
          <AppBar
            position="fixed"
            style={{
              backgroundImage:
                "linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)"
            }}
          >
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                className={classes.grow}
              >
                MyExpences
              </Typography>
              <Button color="inherit" onClick={() => onSignout()}>
                Logout
              </Button>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon onClick={this.toggleDrawer} />
              </IconButton>
              <SwipeableDrawer
                anchor="right"
                open={this.state.open}
                onClose={this.toggleDrawer}
                onOpen={this.toggleDrawer}
              >
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer}
                  onKeyDown={this.toggleDrawer}
                >
                  {sideList}
                </div>
              </SwipeableDrawer>
            </Toolbar>
          </AppBar>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <AppBar
            position="static"
            style={{
              boxShadow: "none",
              backgroundImage:
                "linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)"
            }}
          >
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                className={classes.grow}
              >
                MyExpences
              </Typography>
              <Button color="inherit" onClick={() => onRouteChange("signin")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => onRouteChange("register")}>
                Register
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
