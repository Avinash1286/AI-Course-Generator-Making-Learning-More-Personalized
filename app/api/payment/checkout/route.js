import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
    try {
        const stripe = new Stripe(process.env.STRIP_SECRET_KEY);
        const { priceId } = await req.json(); // Add await here

        if (!priceId) {
            return NextResponse.json(
                { error: "Price ID is required" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: process.env.HOST_URL + 'payment-success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: process.env.HOST_URL,
        });

        return NextResponse.json(session); // Add return here
    } catch (error) {
        console.error('Stripe error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}