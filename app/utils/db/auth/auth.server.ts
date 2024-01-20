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
  request: Request
): Promise<Profile | TypedResponse<never> | null> => {
  const result = await isSessionValid(request, "/");
  if (!result.success) {
    return null;
  }

  const claims = await result.decodedClaims;
  const profilesRef = admin.firestore().collection("profiles");
  const profiles = await profilesRef.where("uid", "==", claims!.uid).get();
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
      maxAge: 60_800,
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      secrets: [process.env.COOKIE_SECRET!],
    },
  });

export const signInUser = async (idToken: string, redirectTo: string) => {
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
      (cookie) => setCookieAndRedirect(cookie, redirectTo),
      (error) => ({
        error: `loginSession UNAUTHORIZED REQUEST!: ${error.message}`,
      })
    );
};

export const signOutUser = async (request: Request) => {
  const session = await getSession(request.headers.get("cookie"));

  return admin
    .auth()
    .verifySessionCookie(session.get("idToken"), true /* Check Revoked */)
    .then((decodedClaims) =>
      admin.auth().revokeRefreshTokens(decodedClaims.sub)
    )
    .then(async () =>
      redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      })
    )
    .catch((error) => {
      console.error(error);
    });
};

export const isSessionValid = async (request: Request, redirectTo: string) => {
  const session = await getSession(request.headers.get("Cookie"));
  const idToken = session.get("idToken");

  if (!idToken) {
    return { success: false };
  }

  try {
    const decodedClaims = admin
      .auth()
      .verifySessionCookie(idToken, true /* Check Revoked */);
    return { success: true, decodedClaims };
  } catch (error) {
    console.error(error);
    throw redirect(redirectTo, {
      status: 401,
    });
  }
};

async function setCookieAndRedirect(cookie: string, redirectTo: string = "/") {
  const session = await getSession();
  session.set("idToken", cookie);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
