import { ActionFunctionArgs } from "@remix-run/node";
import { signOutUser } from "~/utils/db/auth/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  return await signOutUser(request);
}
