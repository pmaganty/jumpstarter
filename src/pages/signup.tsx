import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Auth } from 'aws-amplify';
import { Alert, AlertTitle, Box } from '@mui/material';

import styles from '../styles/Signup.module.css';
import Navbar from '../frontend/components/navbar';
import Footer from '../frontend/components/footer';

const Signup: NextPage = () => {
  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const router = useRouter();

  const onChangeFName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value);
  };

  const onChangeLName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setUsername(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    setIsSigningUp(true);
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          given_name: fName,
          family_name: lName,
          email,
        },
      });
      console.log(user);
      router.push('/verify');
    } catch (error) {
      console.log('error signing up:', error);
    }
    setIsSigningUp(false);
  };

  return (
    <>
      <Head>
        <title>JumpStarter - Sign up</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.signup_wrapper}>
        <h1>Create a new account</h1>
        <div>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={fName}
            onChange={(e) => {
              onChangeFName(e);
            }}
            className={styles.signup_input}
          />
          <input
            type="text"
            name="name"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => {
              onChangeLName(e);
            }}
            className={styles.signup_input}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              onChangeEmail(e);
            }}
            className={styles.signup_input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              onChangePassword(e);
            }}
            className={styles.signup_input}
          />
          {errorMessage !== '' && (
            <Alert severity="error">
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          )}
          <div className="auth-buttons">
            <button
              disabled={isSigningUp}
              type="submit"
              onClick={handleSignUp}
              className={styles.signup_button}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className={styles.account_exists}>
          Already have an account?
          <Link href="/login">Login</Link>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Signup;
