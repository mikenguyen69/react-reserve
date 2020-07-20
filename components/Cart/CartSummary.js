import { Button, Divider, Segment} from 'semantic-ui-react'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import calculateCartTotal from '../../utils/calculateCartTotal'

function CartSummary({ products, handleCheckout, success }) {
  const [isCartEmpty, setCartEmpty] = React.useState(false);
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products])

  return <>
    <Divider />
    <Segment clearing size="large">
      <strong>Sub total: </strong> ${cartAmount}
      <StripeCheckout
        name="React Reserve" 
        amount = { stripeAmount }
        image = { products.length > 0 ? products[0].product.mediaUrl : ""}
        currency="NZD"
        shippingAddress={true}
        billingAddress={true}
        zipCode={true}
        stripeKey="pk_test_51H4zYvHLrgRGMx3gqnUYyOcuFX1Zn54kRwO7cq7mPz9fAmHCuSUipVTCjZRsPfV84u1cpT2G68JKqW3qszCRjBLC00sUD8Q2Qj"
        token={handleCheckout}
        triggerEvent="onClick"
      >
        <Button 
        icon="cart" 
        color="teal" 
        floated="right" content="Checkout" 
        disabled={isCartEmpty || success}
      />
      </StripeCheckout>
      
    </Segment>
  </>;
}

export default CartSummary;
