import React from 'react';
import axios from 'axios';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/index/ProductPagination';
import baseUrl from '../utils/baseUrl';

function Home({ products, totalPages }) {
  
  console.log(totalPages);
  return (
    <>
    <ProductList products={products} />
    <ProductPagination totalPages={totalPages} />
    </>
  )
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 9;
  const payload = { params: {page, size }}
  // fetch data on the server
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url, payload);

  // return response data as an object
  return response.data ;
  // note: these object will be merge with existing props
}



export default Home;
