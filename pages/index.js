import React from 'react';
import axios from 'axios';

function Home({ products }) {
  console.log(products);

  // React.useEffect(() => {
  //   getProducts()
  // }, [])
  return <>home</>
}

// async function getProducts() {
//   const url = 'http://localhost:3000/api/products';
//   const response = await axios.get(url);
//   console.log(response.data);  
// }

Home.getInitialProps = async () => {
  // fetch data on the server
  const url = 'http://localhost:3000/api/products';
  const response = await axios.get(url);

  // return response data as an object
  return { products: response.data };
  // note: these object will be merge with existing props
}

export default Home;
