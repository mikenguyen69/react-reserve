import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin(token) {
    cookie.set('token', token);
    Router.push('/account')
}

export function handleLogout() {
    cookie.remove('token');
    Router.push('/login')
}

export function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { location: location })
        ctx.res.end();
    }
}