import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, schoolId, planName } = body;

    if (!amount) {
      return Response.json({ error: "Amount missing" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `ws_${schoolId}_${Date.now()}`,
      notes: {
        planName,
        schoolId
      }
    });

    return Response.json({ order });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
