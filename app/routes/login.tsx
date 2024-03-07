// REACT
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
// REMIX
import { Form, Link, useFetcher } from "@remix-run/react";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
// EXTERNAL
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
// INTERNAL
import Icons from "~/components/Icons";
import auth from "~/utils/db/auth/config";
import FormInput from "~/components/FormInput/FormInput";
import { signInUser } from "~/utils/db/auth/auth.server";
import PageContainer from "~/containers/PageContainer/PageContainer";
// EXTERNAL
import { SpinnerCircular } from "spinners-react";
// STYLES
import styles from "./styles/Auth.module.css";

export const meta: MetaFunction = () => [
  { title: "SPADE Mental Health | Login" },
  {
    name: "description",
    content: "Welcome back to the community! Log in and start a discussion.",
  },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const idToken = formData.get("idToken") as string;

  try {
    return await signInUser(request, idToken, "/");
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Login() {
  const { submit, formData } = useFetcher();
  const [pwd, setPwd] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [, setEmailFocus] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  const isEmailLoginSubmitting = formData?.get("login-type") === "email-login";
  const isGoogleLoginSubmitting =
    formData?.get("login-type") === "google-login";

  // Focus email input on load
  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  // Reset error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, setErrMsg]);

  // HANDLERS
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPwd(event.currentTarget.value);
  };

  const handleEmailFocus = () => setEmailFocus(true);

  const handleEmailExit = () => setEmailFocus(false);

  const signInWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pwd);

      if (userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        submit({ idToken, "login-type": "email-login" }, { method: "post" });
      }
    } catch (error) {
      console.log("error with sign in");
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        const idToken = await user.getIdToken();
        submit({ idToken, "login-type": "google-login" }, { method: "post" });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer id={styles["login-page"]}>
      <Form method="post" id={styles["login-form"]}>
        <header>
          <h2>Welcome back!</h2>
          <p className={styles.signUpLink}>
            New around here? <Link to="/register">Register now</Link>.
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
          id={styles["login-email-input"]}
          type="text"
          ref={emailRef}
          required
          autoComplete="off"
          label="Email"
          name="email"
          labelClassName={`${email ? styles.shrink : ""} ${
            styles["form-labels"]
          }`}
          inputClassName={styles["form-inputs"]}
          inputContainerClassName={styles["form-input-containers"]}
          handleChange={handleEmailChange}
          handleFocus={handleEmailFocus}
          handleExit={handleEmailExit}
        />

        <FormInput
          id={styles["login-password-input"]}
          type="password"
          required
          label="Password"
          name="password"
          labelClassName={`${pwd ? styles.shrink : ""} ${
            styles["form-labels"]
          }`}
          inputClassName={styles["form-inputs"]}
          inputContainerClassName={styles["form-input-containers"]}
          handleChange={handlePasswordChange}
        />
        <footer>
          <button
            className={styles["submit-btn"]}
            type="button"
            onClick={signInWithEmail}
          >
            {isEmailLoginSubmitting ? (
              <SpinnerCircular size={30} color="white" />
            ) : (
              "Login"
            )}
          </button>
          <button
            className={styles["submit-btn"]}
            type="button"
            onClick={signInWithGoogle}
          >
            {isGoogleLoginSubmitting ? (
              <SpinnerCircular size={30} color="white" />
            ) : (
              <>
                <Icons type="brand-google" />
                Sign In With Google
              </>
            )}
          </button>
        </footer>
      </Form>
    </PageContainer>
  );
}
