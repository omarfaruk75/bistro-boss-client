import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate();
    // console.log(clientSecret);
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log("Payment Method", error);
            setError(error.message)
        } else {
            console.log('Payment Method', paymentMethod);
            setError('')
        }
        //confir payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        })
        if (confirmError) {
            console.log('hello from errorof payment confirem');
        } else {
            console.log('payment-intent', paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log('payment confirmed');

            }
            setTransactionId(paymentIntent.id)
            //now save the payment in the database
            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(), //convert to utc date for internation time maintain
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuID),
                status: 'pending'
            }
            const res = await axiosSecure.post('/payments', payment);
            console.log("payment saved", res.data);
            refetch()
            if (res.data?.paymentsResult?.insertedId) {
                navigate('/dashboard/paymentHistory')
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank You for Your Payment",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600"> Your Transaction Id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;