import React from 'react';
import { StaticRouter as Router, Switch, Route, useLocation, useHistory, Redirect } from 'react-router-dom';

import Home from './views/home'
import Tags from './views/tags'
import Categories from './views/categories'
import Tutorials from './views/tutorials'
import Tutorial from './views/tutorial'
import Blogs from './views/blogs'
import Blog from './views/blog'
import Payment from './views/payment'
import Templates from './views/templates'
import Template from './views/template'
import Messenger from './views/messenger'
import Testing from './views/testing'
import Search from './views/search'
import Write from './views/write'
// import Chat from './components/Chat/Chat'; 
import Join from './components/Join/Join';
import Gallery from './components/Image/Gallery'
// import Search from './components/Search/Search';
//import Search from './components/Search';
import Profile from './components/Profile';
// const PrivateRoute = ({component: Component, ...rest}) => (
  //   <Route {...rest} render={(props) => (
  //     AuthClass.isAuthenticated() === true && AuthClass.isAuthorized() === true ?
  //     <Component {...props} />
  //     : AuthClass.isAuthenticated === true && AuthClass.isAuthorized() !== true ? <Redirect to='/auth/not-authorized' />
  //     : <Redirect to='/auth/login' />
  //   )} />
  // )

  const PublicRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      <Component {...props} />
    )} />
  )
const routes = () => (
  <Switch>
    {/* <Route path="/auth/login" component={Profile} /> */}
    {/* <Route path="/chat" component={Chat} /> */}
    {/* <Route path="/messenger" component={Messenger} /> */}
    {/* <Route path="/search" component={Search} /> */}

    <Route path="/payment" component={Payment} />
    <Route path="/image" component={Gallery} />
    <Route path="/profile/:username" component={Profile} />
    <Route path="/profile" component={Profile} />
    <Route path="/join" exact component={Join} />
    <Route path="/messenger" component={Messenger} />
    <Route path="/write" component={Write} />
    <Route path="/ck-editor" component={Messenger} />
    <Route path="/search" component={Search} />
    <Route path="/tags" component={Tags} />
    <Route path="/categories" component={Categories} />
    <Route path="/blogs/:slug" component={Blog} />
    <Route path="/blogs" component={Blogs} />
    <Redirect strict from="/blog/:slug" to="/blogs/:slug" />
    <Route path="/tutorials/:category/:slug" component={Tutorial} />
    <Route path="/tutorials/:category" component={Tutorial} />
    <Route path="/tutorials" component={Tutorials} />
    <Route path="/templates/:category/:slug" component={Template} />
    <Route path="/templates/:category" component={Templates} />
    <Route path="/templates" component={Templates} />
    <Route path="/testing" component={Testing} />
    <Route path="/" component={Home} />
  </Switch>
);
export default routes
