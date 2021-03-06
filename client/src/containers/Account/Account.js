import React from "react";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import AccountHeader from "../../components/AccountComponents/AccountHeader";
import Info from "../../components/AccountComponents/Info";
import ChangeEmail from "../../components/AccountComponents/ChangeEmail";
import ChangePassword from "../../components/AccountComponents/ChangePassword";
import ClearExpences from "../../components/AccountComponents/ClearExpences";
import DeleteAccount from "../../components/AccountComponents/DeleteAccount";

import "./Account.css";

class Account extends React.Component {
  render() {
    const { name, email, joined, currency } = this.props;

    if (!this.props.isSignedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="account-container">
        <AccountHeader />
        <Grid container justify="space-between" wrap="wrap" spacing={32}>
          <Grid item xs={12} sm={6} md={4}>
            <Info
              name={name}
              email={email}
              joined={joined}
              currency={currency}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Grid container direction="column" justify="center" spacing={32}>
              <Grid item>
                <ChangeEmail />
              </Grid>

              <Grid item>
                <ChangePassword />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Grid container direction="column" justify="center" spacing={32}>
              <Grid item>
                <ClearExpences />
              </Grid>

              <Grid item>
                <DeleteAccount />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
