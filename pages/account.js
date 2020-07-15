import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import {parseCookie} from 'js-cookie'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'

function Account({user, orders}) {
  console.log(orders);
  return <>
    <AccountHeader {...user}/>
    <AccountOrders orders={orders} />
  </>;
}

Account.getInitialProps = async ctx => {
  // const { token } = parseCookie(ctx)
  // if (!token) {
  //   return { orders: []}
  // }

  // console.log(token);

  // const payload = { headers: { Authorization: token }}
  // const url = `${baseUrl}/api/orders`
  // const response = await axios.get(url, payload)
  // return response.data

  return { orders: []}
}

export default Account;
