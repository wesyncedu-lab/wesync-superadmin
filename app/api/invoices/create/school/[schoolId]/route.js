// app/api/invoices/school/[schoolId]/route.js
import { db } from "@/common/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export async function GET(req, { params }) {
  try {
    const { schoolId } = params;
    if (!schoolId) return new Response(JSON.stringify({ success: false, error: "Missing schoolId" }), { status: 400 });

    // Fetch invoices for this school
    const q = query(collection(db, "invoices"), where("schoolId", "==", schoolId), orderBy("issuedOn", "desc"));
    const snap = await getDocs(q);
    const invoices = [];
    snap.forEach((d) => invoices.push({ id: d.id, ...d.data() }));

    // Optionally fetch school info (if you store it in schools collection)
    let schoolInfo = null;
    try {
      const schoolDoc = await (await import("firebase/firestore")).getDoc((await import("firebase/firestore")).doc(db, "schools", schoolId));
      if (schoolDoc.exists()) schoolInfo = schoolDoc.data().info || null;
    } catch (e) {
      // ignore if schools collection/not setup
    }

    return new Response(JSON.stringify({ success: true, invoices, schoolInfo }), { status: 200 });
  } catch (error) {
    console.error("List invoices error", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
