import { setUser } from "@/redux/slices/userSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAppDispatch, useAppSelector } from "./redux-hooks";

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const checkUser = onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUser(currentUser));
    return () => {
      checkUser();
    };
  });

  const { user } = useAppSelector((state) => state.user);

  return {
    isSignedIn: user != null,
    user,
  };
}
