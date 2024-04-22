import { SESSION_KEY } from 'common/config'
import Cookie from 'js-cookie'
import { Redirect, Route } from 'react-router-dom'
interface PrivateRouteProps {
  path: string
  component: any
  exact?: boolean
}

export default function PrivateRoute({
  path,
  component,
  exact,
}: PrivateRouteProps) {
  const cookie = Cookie.get(SESSION_KEY.SESSION)
  const Component = component
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        // <Component {...props} />
        cookie ? <Component {...props} /> : <Redirect to={'/login'} />
      }
    />
  )
}
