import { db } from "@/common/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getSchoolBySubdomain(subdomain) {
  const q = query(
    collection(db, "schools"),
    where("subdomain", "==", `${subdomain}.wesync.cc`)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  return snap.docs[0].data();
}
