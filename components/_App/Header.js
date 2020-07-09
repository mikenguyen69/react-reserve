import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { handleLogout } from '../../utils/auth';

function Header(user) {
  console.log(user)
  const router = useRouter();
  const isRoot = user.role === 'root';
  const isAdmin = user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;
  
  router.onRouteChangeStart = () => NProgress.start();
  router.OnRouteChangeComplete = () => NProgress.done();
  router.OnRouteChangeError = () => NProgress.done();

  function isActive(route) {
    return route ===  router.pathname;
  }

  return (
    <Menu stackable fluid id="menu" inverted >
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image 
              size="mini" 
              src="/static/logo.svg"
              style={{ marginRight: '1em'}}
            />
            Cart Reserve
          </Menu.Item>
        </Link>

        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon 
              name="cart" 
              size="large" 
            />
            Cart
          </Menu.Item>
        </Link>

        { isRootOrAdmin && (
        <Link href="/create">
          <Menu.Item header active={isActive('/create')}>
            <Icon 
              name="add square" 
              size="large" 
            />
            Create
          </Menu.Item>
        </Link>
        )}

        {user ? (<>
          <Link href="/account">
            <Menu.Item header active={isActive('/account')}>
              <Icon 
                name="user" 
                size="large" 
              />
              Account
            </Menu.Item>
          </Link>

          <Menu.Item onClick={handleLogout} header>
            <Icon 
              name="sign out" 
              size="large" 
            />
            Logout
          </Menu.Item>
        </>)
        : 
        (<>
          <Link href="/login">
            <Menu.Item header active={isActive('/login')}>
              <Icon 
                name="sign in" 
                size="large" 
              />
              Login
            </Menu.Item>
          </Link>

          <Link href="/signup">
            <Menu.Item header active={isActive('/signup')}>
              <Icon 
                name="signup" 
                size="large" 
              />
              Signup
            </Menu.Item>
          </Link>
        </>)}

      </Container>
    </Menu>
  );
}

export default Header;
