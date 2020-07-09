import React from 'react'
import {Message, Form, Segment, Button, Icon} from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';

const INITIAL_USER = {
  email: "",
  password: ""
}

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(event) {
    const {name, value} = event.target;
    setUser(prevState => ({...prevState, [name]: value}))
  } 

  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true)
      setError('')
      console.log(user)
    } catch(error) {
      catchErrors(error, setError)
    }
    finally {
      setLoading(false)
    }
  }
  return <>

    <Message 
      attached 
      icon="privacy"
      header="Welcome back!"
      content="Log in with email and password"
      color="blue"
    />
    <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
      <Message 
        error
        header="Opps!"
        content={error}
      />
      <Segment>
        <Form.Input 
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={user.email}
        />
        <Form.Input 
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={user.password}
        />
        <Button 
          icon="sign in"
          type="submit"
          color="orange"
          content="Login"
          disabled={disabled || loading}
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help" />
      New user?{" "}
      <Link href="/signup">
        <a>Sign up here</a>
      </Link>{" "}
      instead.
    </Message>
    
  </>
}


export default Login;
