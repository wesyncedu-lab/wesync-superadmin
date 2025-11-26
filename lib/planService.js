import { db } from "@/common/firebase";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

// CREATE Plan
export async function createPlan(planId, data) {
  await setDoc(doc(collection(db, "plans"), planId), {
    ...data,
    createdAt: new Date(),
    status: "active",
  });
}

// GET all plans
export async function fetchPlans() {
  const snap = await getDocs(collection(db, "plans"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// GET single plan
export async function fetchPlan(planId) {
  const ref = doc(db, "plans", planId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// UPDATE existing plan
export async function updatePlan(planId, data) {
  await updateDoc(doc(db, "plans", planId), data);
}
