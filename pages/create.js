import React from 'react';
import axios from 'axios';
import { Form, Input, TextArea, Button, Image, Message, Header, Icon  } from 'semantic-ui-react';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INTIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INTIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));

    isProduct ? setDisabled(false) : setDisabled(true)

  },[product])

  function handleChange(event) {
    const {name, value, files} = event.target;
    if (name === 'media') {
      setProduct((prevState) => ({...prevState, media: files[0]}))
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError('')
      const mediaUrl = await handleImageUpload();
      
      const url = `${baseUrl}/api/product`;
      const { name, price, description} = product;
      const payload = { name, price, description, mediaUrl };    

      const createdProduct = await axios.post(url, payload);
      
      console.log(createdProduct);
      setProduct(INTIAL_PRODUCT);
      setSuccess(true);
    }
    catch(err) {
      catchErrors(err, setError);
    } finally {
      setLoading(false);
    }

  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.media)
    data.append('upload_preset', 'react-store')
    data.append('cloud_name', 'mikenguyen0719')
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const medialUrl = response.data.url;
    return medialUrl;
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form loading={loading} success={success} error={Boolean(error)} onSubmit={handleSubmit}>
        <Message
          error
          header="Opps!"
          content={error}
        />
        <Message 
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field 
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            value={product.name}
            onChange={handleChange}
          />

          <Form.Field 
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />

          <Form.Field 
            control={Input}
            name="media"
            label="Meda"
            type="file"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small"/>
        <Form.Field 
            control={TextArea}
            name="description"
            label="Description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
        />

        <Form.Field 
          control={Button}
          disabled={disabled}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
          onSubmit={handleSubmit}
        />
      </Form>
    </>
  );
}

export default CreateProduct;
