import {
  collection,
  query,
  getCountFromServer,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase.utils";

export const doesDisplayNameExist = async (displayName: string) => {
  const q = query(
    collection(db, "users"),
    where("displayName", "==", displayName)
  );
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count >= 1;
};
