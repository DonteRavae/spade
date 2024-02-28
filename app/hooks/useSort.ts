import { RefObject, useCallback, useEffect, useState } from "react";
import { DropdownRef } from "~/components/Dropdown/Dropdown";
import {
  ForumComment,
  ForumPost,
  PodcastData,
  SortBy,
} from "~/utils/lib/types";

export default function useSort(
  content: PodcastData[] | ForumComment[] | ForumPost[],
  dropdown: RefObject<DropdownRef>
) {
  const [sortBy, setSortBy] = useState<string>(SortBy.Latest);

  const sort = useCallback(
    (sortBy: string) => {
      if (sortBy === SortBy.Latest) {
        content.sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
        setSortBy(SortBy.Latest);
      } else if (sortBy === SortBy.Oldest) {
        content.sort(
          (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
        );
        setSortBy(SortBy.Oldest);
      }

      dropdown.current?.closeMenu();
    },
    [content, dropdown]
  );

  useEffect(() => {
    // Sorts calalog when a filter changes causes route change
    sort(sortBy);
  }, [sort, sortBy]);

  return { sortBy, sort };
}
