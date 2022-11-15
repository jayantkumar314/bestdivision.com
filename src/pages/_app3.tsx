import React, { useState, useEffect } from 'react';
import { StaticRouter as Router, Switch, Route, useLocation, useHistory, Redirect } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
// import { Helmet, HelmetProvider } from "react-helmet-async"

import 'app.css';
// import './index.css';
// import './Chat.css';
// import './comments.css'
// import './CourseCard.css';
// import './footer.css';
// import './footer.css';
// import './CustomDesktopSearch.css'
// import './CustomDesktopSearch.css'
// import './Header.css'
// import 'common/css/search.css';
// import './Login.css'
// import './MegaMenu.css'
// import './FullScreen.css';
// import './FullScreen.css'
// import './FullScreen.css'
// import './InfoBar.css';
// import './Input.css';
// import './Join.css';
// import './leftnav.css'
// import './leftnav.css'
// import './leftnav.css'
// import './leftnav.css'
// import './Messages.css';
// import './Message.css';
// import './Modal.css'
// import './ContentSection.css';
// import 'common/css/pills.css';
// import 'common/css/search.css';
// import './Post.css'
// import './Share.css'
// import './Profile.css'
// import './Share.css'
// import './TextContainer.css';
// import 'app.css';
// import './Messenger.css';
// import './Blog.css'
// import './Blogs.css'
// import './Blogs.css'
// import './Blogs.css'
// import './Blogs.css'
// import './Categories.css'
// import './Home.css'
// import './Content.css'
// import 'components/common/css/common.css'
// import 'components/common/css/pills.css'
// import 'components/common/css/search.css'
// import 'components/common/css/common.css';
// import 'app.css';
// import './Tutorials.css'
// import './Messenger.css'
// import './Search.css'
// import './Tags.css'
// import './Post.css'
// import './Templates.css'
// import './Post.css'
// import './Templates.css'
// import './Testing.css'
// import './Tutorial.css'
// import './Blogs.css'
// import './Post.css'
// import './Tutorials.css'


import Header from 'components/Header'
import LeftNav from 'components/LeftNav'
import Footer from 'components/Footer'

// import PrivateLayout from './routes/PrivateLayout'
// import HelmetMetaData from "./components/core/HelmetMetaData/HelmetMetaData";

import { FormattedMessage } from "react-intl"
import { I18nPropvider, LOCALES } from 'i18nProvider'
import translate from "i18nProvider/translate"
// import CkEditor from './components/CkEditor/CkEditor';
// import firebase from 'firebase'
import Routes from 'routes.js'

const App = () => {
  let history
  if (typeof document !== 'undefined') {
    history = createBrowserHistory();
    // const history = createMemoryHistory();
  }

  // const history = useHistory();
  // const location = useLocation();
  const [locale, setLocale] = useState(LOCALES.HINDI);
  // const history = createMemoryHistory();

  //https://www.cometchat.com/tutorials/react-chat-push-notifications
  useEffect(() => {
    // const messaging = firebase.messaging();
    // messaging.requestPermission().then(() => {
    //   console.log("Have Permission");
    //   return messaging.getToken();
    }).then(token => {
      console.log('FCM Token:', token);
      // apiKey: "AIzaSyAs0MowZsfVBNBV2o09sZPomqJp8Uw0S_g",
      //     authDomain: "best-division-local.firebaseapp.com",
      //         projectId: "best-division-local",
      //             storageBucket: "best-division-local.appspot.com",
      //                 messagingSenderId: "662779401941",
      //                     appId: "1:662779401941:web:443d22c8ea9ea6de4fb45c",
      //                         measurementId: "G-D3MJTQCMXW"
      var userType = 'group';
      // var UID = process.env.REACT_APP_COMETCHAT_GUID;
      // var appId = process.env.REACT_APP_COMETCHAT_APP_ID;
      var appId = "1:662779401941:web:443d22c8ea9ea6de4fb45c";
      var topic = `${appId}_${userType}_`;
      var url = `${process.env.REACT_APP_BASE_URL}/token/topics/${topic}`;
      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ appId: appId }),
      }).then(response => {
        if (response.status < 200 || response.status >= 400) {
          console.log(
            'Error subscribing to topic: ' +
            response.status +
            ' - ' +
            response.text()
          );
        }
        console.log('Subscribed to "' + topic + '"');
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      if (error.code === "messaging/permission-blocked") {
        console.log("Please Unblock Notification Request Manually");
      } else {
        console.log("Error Occurred", error);
      }
    });
  }, [])

  return (
    <>
      {/* <HelmetProvider> */}
        <I18nPropvider locale={locale}>
          {/* <HelmetMetaData ></HelmetMetaData> */}
          <div id="main" className="css-scope tent" ></div >
          <main id="bd_main" >
            <Header />
            <section id="section_aside" className="css-scope section_aside" >
              <aside id="section_leftnav" className="css-scope section_leftnav">
                <LeftNav />
              </aside>
              <aside id="section_rightnav" className="css-scope section_rightnav"></aside>
            </section >
            <Routes />
            <Footer />
          </main>
        </I18nPropvider>
      {/* </HelmetProvider> */}
    </>
  );
}

export default App;