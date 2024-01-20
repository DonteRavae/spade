// REACT
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
// REMIX
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, useFetcher } from "@remix-run/react";
// INTERNAL
import Icons from "~/components/Icons";
import auth, { db } from "../utils/db/auth/config";
import FormInput from "~/components/FormInput/FormInput";
import { signInUser } from "~/utils/db/auth/auth.server";
import PageContainer from "~/components/PageContainer/PageContainer";
// EXTERNAL
import { addDoc, collection } from "firebase/firestore";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// STYLES
import styles from "./styles/Auth.module.css";

const EMAIL_VALIDATION = /^(\w+@[a-zA-Z_]+?\.[a-zA-Z.]{2,6})$/;
const PWD_VALIDATION =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const uid = formData.get("uid") as string;
  let username = formData.get("username") as string;
  let avatar = `https://api.multiavatar.com/${uid}.svg`;
  const idToken = formData.get("idToken") as string;
  const registrationType = formData.get("registration-type");

  try {
    if (registrationType === "google-registration") {
      username = `spade_${username.split(" ")[0].toLowerCase()}`;
      avatar = formData.get("avatar") as string;
      console.log(username);
    }

    const docRef = await addDoc(collection(db, "profiles"), {
      username,
      uid,
      avatar,
    });
    console.log("Document written with ID: ", docRef.id);
    return await signInUser(request, idToken, "/");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Register() {
  const fetcher = useFetcher();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  const [errMsg, setErrMsg] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [, setUsernameFocus] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [, setEmailFocus] = useState<boolean>(true);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  // Focus username input on load
  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus();
  }, []);

  // Check email validity on input change
  useEffect(() => {
    setValidEmail(EMAIL_VALIDATION.test(email));
  }, [email]);

  // Check password validity on input change
  useEffect(() => {
    setValidPwd(PWD_VALIDATION.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // Reset error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd, setErrMsg]);

  // HANDLERS

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPwd(value);
        break;
      case "passwordMatch":
        setMatchPwd(value);
        break;
      default:
        return;
    }
  };

  const handleUsernameFocus = () => setUsernameFocus(true);

  const handleUsernameExit = () => setUsernameFocus(false);

  const handleEmailFocus = () => setEmailFocus(true);

  const handleEmailExit = () => setEmailFocus(false);

  const handlePasswordFocus = () => setPwdFocus(true);

  const handlePasswordExit = () => setPwdFocus(false);

  const handleMatchPasswordFocus = () => setMatchFocus(true);

  const handleMatchPasswordExit = () => setMatchFocus(false);

  const registerWithEmail = async () => {
    try {
      await signOut(auth);

      const { user } = await createUserWithEmailAndPassword(auth, email, pwd);
      const { uid } = user;
      const idToken = await user.getIdToken();

      fetcher.submit(
        {
          uid,
          username,
          idToken,
          "registration-type": "email-registration",
        },
        {
          method: "post",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const registerWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (result) => {
        const { displayName, uid, photoURL } = result.user;
        const idToken = await result.user.getIdToken();

        fetcher.submit(
          {
            idToken,
            uid,
            username: displayName,
            avatar: photoURL,
            "registration-type": "google-registration",
          },
          { method: "post" }
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer id={styles["registration-page"]}>
      <Form method="post" id={styles["registration-form"]}>
        <header></header>
        <header>
          <h2>Create an account with us today!</h2>
          <p className={styles.signUpLink}>
            Already have an account? <Link to="/login">Login</Link>.
          </p>

          <p
            ref={errorRef}
            className={`${errMsg ? styles.errorMessage : styles.offscreen}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </header>

        <FormInput
          id={styles["registration-username-input"]}
          autoComplete="off"
          label="Username"
          name="username"
          value={username}
          ref={usernameRef}
          inputContainerClassName={styles["form-input-containers"]}
          inputClassName={styles["form-inputs"]}
          labelClassName={`${username ? styles.shrink : ""} ${
            styles["form-labels"]
          }`}
          required
          handleChange={handleInputChange}
          handleFocus={handleUsernameFocus}
          handleExit={handleUsernameExit}
        />

        <FormInput
          id={styles["registration-email-input"]}
          type="email"
          ariaInvalid={!validEmail}
          autoComplete="off"
          label="Email"
          name="email"
          value={email}
          ref={emailRef}
          inputContainerClassName={styles["form-input-containers"]}
          inputClassName={styles["form-inputs"]}
          labelClassName={`${email ? styles.shrink : ""} ${
            styles["form-labels"]
          }`}
          required
          handleChange={handleInputChange}
          handleFocus={handleEmailFocus}
          handleExit={handleEmailExit}
        />

        <FormInput
          id={styles["registration-password-input"]}
          type="password"
          ariaInvalid={!validPwd}
          ariaDescribedBy="pwdnote"
          label="Password"
          name="password"
          value={pwd}
          inputContainerClassName={styles["form-input-containers"]}
          inputClassName={styles["form-inputs"]}
          labelClassName={`${pwd ? styles.shrink : ""} ${
            styles["form-labels"]
          }`}
          required
          handleChange={handleInputChange}
          handleFocus={handlePasswordFocus}
          handleExit={handlePasswordExit}
        />

        <div
          className={
            pwdFocus && !validPwd ? styles.instruction : styles.offscreen
          }
        >
          <p id="pwdnote">
            <Icons type="info-circle" />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number, and a
            special character.
            <br />
            <span>
              Allowed special characters:{" "}
              <span aria-label="exclamation-mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>{" "}
            </span>
          </p>
        </div>

        <FormInput
          id={styles["registration-match-password-input"]}
          type="password"
          ariaInvalid={!validMatch}
          ariaDescribedBy="pwdconfirmnote"
          label="Confirm Password"
          name="passwordMatch"
          value={matchPwd}
          inputContainerClassName={styles["form-input-containers"]}
          inputClassName={styles["form-inputs"]}
          labelClassName={`${matchPwd ? styles.shrink : ""} ${
            styles["form-labels"]
          }`}
          required
          handleChange={handleInputChange}
          handleFocus={handleMatchPasswordFocus}
          handleExit={handleMatchPasswordExit}
        />

        <div
          className={
            matchFocus && !validMatch ? styles.instruction : styles.offscreen
          }
        >
          <p id="pwdconfirmnote">
            <Icons type="info-circle" /> Must match the first password input.
          </p>
        </div>
        <footer>
          <button
            className={styles["submit-btn"]}
            type="button"
            onClick={registerWithEmail}
          >
            Register
          </button>

          <button
            className={styles["submit-btn"]}
            type="button"
            onClick={registerWithGoogle}
          >
            <Icons type="brand-google" /> Register With Google
          </button>
        </footer>
      </Form>
    </PageContainer>
  );
}
