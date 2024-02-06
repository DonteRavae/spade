// REACT
import { useEffect, useState } from "react";
// REMIX
import { useFetcher, useOutletContext, useSubmit } from "@remix-run/react";
// INTERNAL
import Icons from "../Icons";
import { AppContext } from "~/root";
import { ToastStatus } from "../ToastStack/ToastStack";
import { Favorite } from "~/utils/db/community/types.server";
// STYLES
import styles from "./FavoriteController.module.css";

export default function FavoriteController({
  parentId,
  direction,
  theme,
}: {
  parentId: string;
  direction: "horizontal" | "vertical";
  theme: "light" | "dark";
}) {
  const submit = useSubmit();
  const { Form, formData } = useFetcher();
  const { profile, addToast, favoritesByUser } = useOutletContext<AppContext>();
  const [isFavorite, setIsFavorite] = useState<Favorite | undefined>(
    favoritesByUser.find((fav) => fav.parentId === parentId)
  );
  const favorite = formData ? formData.get("favorite") === "true" : isFavorite;

  useEffect(() => {
    setIsFavorite(favoritesByUser.find((fav) => fav.parentId === parentId));
  }, [parentId, favoritesByUser]);

  const handleSubmission = () => {
    try {
      if (!profile)
        return addToast(
          ToastStatus.Information,
          "You must sign in to add to favorites."
        );

      favorite
        ? submit(
            {
              parentId,
              userId: profile?.id,
              "request-type": "remove-favorite",
            },
            { method: "post" }
          )
        : submit(
            {
              parentId,
              userId: profile?.id,
              "request-type": "add-favorite",
            },
            { method: "post" }
          );
    } catch (error) {
      console.error(error); // TODO: Log error
      addToast(ToastStatus.Error, "Seems we hit a snag! Please try again.");
    }
  };

  return (
    <section
      className={`${styles["favorite-controller"]} ${styles[`${theme}`]}`}
    >
      <Form method="post" onSubmit={handleSubmission}>
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          className={`${styles[`${direction}`]}`}
        >
          <Icons type={favorite ? "full-heart" : "empty-heart"} />
          Favorite
        </button>
      </Form>
    </section>
  );
}
