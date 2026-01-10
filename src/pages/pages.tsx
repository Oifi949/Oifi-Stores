import CheckoutPage from "./Checkout";
import ConvertToSubcurrency from "../lib/ConvertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("import.meta.VITE_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY);

export default function pages() {
    const amount = 49.99;
  return (
    <div>
      {" "}
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: ConvertToSubcurrency(amount), //cents
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
}
