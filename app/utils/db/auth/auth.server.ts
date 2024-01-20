// REMIX
import {
  TypedResponse,
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node";
// FIREBASE
import admin from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";

if (!admin.apps.length) initializeApp({ credential: applicationDefault() });

/**
 * This file contains handlers for user management using Firebase Authentication.
 */

export type Profile = {
  uid: string;
  username: string;
  avatar: string;
};

export const retrieveProfile = async (
  userId: string
): Promise<Profile | TypedResponse<never> | null> => {
  const profilesRef = admin.firestore().collection("profiles");
  const profiles = await profilesRef.where("uid", "==", userId).get();
  if (profiles.empty) {
    console.log("Profile doesn't exist");
    return redirect("/login", {
      status: 400,
    });
  }

  return profiles.docs[0].data() as Profile;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "gfb_token",
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      secrets: [process.env.COOKIE_SECRET!],
    },
  });

export const signInUser = async (
  request: Request,
  idToken: string,
  redirectTo: string
) => {
  admin
    .auth()
    .verifyIdToken(idToken)
    .catch(() => ({ error: "Invalid ID Token" }));

  return admin
    .auth()
    .createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    })
    .then(
      (cookie) => setCookieAndRedirect(request, cookie, redirectTo),
      (error) => ({
        error: `loginSession UNAUTHORIZED REQUEST!: ${error.message}`,
      })
    );
};

export const signOutUser = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  const newCookie = await destroySession(session);
  return redirect("/", {
    headers: {
      "Set-Cookie": newCookie,
    },
  });
};

export const isSessionValid = async (request: Request, redirectTo: string) => {
  const session = await getSession(request.headers.get("Cookie"));
  const idToken = session.get("idToken");

  if (!idToken) {
    return { success: false };
  }

  try {
    const decodedClaims = await admin.auth().verifySessionCookie(idToken, true);
    return { success: true, decodedClaims };
  } catch (error) {
    console.error(error);
    throw redirect(redirectTo, {});
  }
};

async function setCookieAndRedirect(
  request: Request,
  cookie: string,
  redirectTo: string = "/"
) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("idToken", cookie);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
