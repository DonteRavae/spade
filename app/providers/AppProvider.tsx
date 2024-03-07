import { ReactNode, createContext, useContext, useMemo } from "react";
import { Vote, Favorite, UserProfile } from "~/utils/lib/types.server";
import { ToastData, ToastStatus } from "~/components/ToastStack/ToastStack";

export type AppContextState = {
  stack: ToastData[];
  votesByUser: Vote[];
  favoritesByUser: Favorite[];
  profile: UserProfile | null;
  addToast: (status: ToastStatus, message: string) => void;
  removeToast: (id: string) => void;
};

const INITIAL_CONTEXT: AppContextState = {
  profile: null,
  stack: [],
  votesByUser: [],
  favoritesByUser: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToast: (_status: ToastStatus, _message: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeToast: (_id) => {},
};

const AppContext = createContext<AppContextState>(INITIAL_CONTEXT);

export default function AppProvider({
  children,
  initialContext,
}: {
  children: ReactNode;
  initialContext: AppContextState;
}) {
  const contextValue = useMemo(() => initialContext, [initialContext]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
