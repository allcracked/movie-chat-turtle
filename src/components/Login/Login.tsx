import React from "react";
import firebase from "firebase/app";

import { Container, Button, Link, makeStyles } from "@material-ui/core";

import { fbAuth } from "../../services/firebase";

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    marginTop: 100,
  },
  loginButtonWrapper: {
    width: 200,
    margin: "0px auto",
  },
  loginButton: {
    width: 200,
    height: 50,
    backgroundColor: "rgb(234, 74, 61)",
    "&:hover": {
      backgroundColor: "rgb(234, 74, 61)",
    },
  },
  anonymousLinkWrapper: {
    textAlign: "center",
  },
  anonymousLink: {
    cursor: "pointer",
    color: "#888",
    "&:hover": {
        textDecoration: "none",
    },
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();

  const handleGoogleLogin = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    fbAuth.signInWithPopup(googleProvider);
  };

  const handleAnonymousLogin = () => {
    fbAuth.signInAnonymously();
  };

  return (
    <Container maxWidth="xs" className={classes.loginContainer}>
      <div className={classes.loginButtonWrapper}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.loginButton}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
      </div>

      <br />
      <div className={classes.anonymousLinkWrapper}>
        <Link onClick={handleAnonymousLogin} className={classes.anonymousLink}>
          Login Anonymously
        </Link>
      </div>
    </Container>
  );
};

export default Login;
