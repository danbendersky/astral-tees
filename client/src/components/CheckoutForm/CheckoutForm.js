import { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import './CheckoutForm.css'

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//This links gelato products to stripe (productId : priceId)
const gelatoToStripe = {
  'd5f968a2-4560-4f5a-a53b-695ccf404eaa': 'price_1RrHyHPPpqBJhTNiPx7PpSmI',
  'e23f23b5-7430-4cf6-8786-a5888f2ecf52': 'price_1RrI5BPPpqBJhTNiI8LoxxoC',
  'c2723283-2dfb-4938-a519-3a4b9b149c64': 'price_1RrI3qPPpqBJhTNiryk97nEt',
  '7795d001-dc6f-4b08-9234-3e012626cf22': 'price_1RrICoPPpqBJhTNioFxJiNpU'
};

const stripePromise = loadStripe("pk_live_51RqdhFPPpqBJhTNiAY4OmOgSVofSMt34mAH9DeESNKxxNr0VJLT9VnEmlV2IdDev01oQvCl5ArvrKcPbHnN1kuuG00322gGl2t");

const CheckoutForm = () => {
  const [storedCart, setCart] = useState([]);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const lineItems = storedCart.map((item) => ({
      price: gelatoToStripe[item.productId],
      quantity: item.qty
    }));

    fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: lineItems })
    })
      .then((res) => res.json())
      .then((data) => {
        setOptions({
          fetchClientSecret: () => Promise.resolve(data.clientSecret),
        });
      });
  }, []);

  if (!options) return <div>Loading checkout...</div>;

  return (
    <div id="checkout" className='form'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;