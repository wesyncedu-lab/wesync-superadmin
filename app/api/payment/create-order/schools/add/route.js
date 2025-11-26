import { db } from "@/common/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    const schoolId = `SCH-${Math.floor(100000 + Math.random() * 900000)}`;

    await setDoc(doc(db, "schools", schoolId), {
      info: {
        name: body.name,
        city: body.city,
        plan: body.plan,
        phone: body.phone,
        schoolCode: schoolId,
        createdAt: new Date().toISOString(),
      },
      usage: {
        totalStudents: 0,
        totalTeachers: 0,
        lastActive: new Date().toISOString(),
      },
    });

    return new Response(JSON.stringify({ success: true, schoolId }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
