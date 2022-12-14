import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Header from 'components/Header'
import LeftNav from 'components/LeftNav'
import Footer from 'components/Footer'
import { FormattedMessage } from "react-intl"
import { I18nPropvider, LOCALES } from 'i18nProvider'
import translate from "i18nProvider/translate"
import { StateProvider } from 'StateProvider';
import reducer, { initialState } from 'reducer';


export default function Home() {
  const [locale, setLocale] = useState(LOCALES.HINDI);
  return (
    <div className={styles.container}>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
      </main>

      <footer className={styles.footer}>
        
      </footer> */}
      <StateProvider initialState={initialState} reducer={reducer}>
      <I18nPropvider locale={locale}>
          {/* <HelmetMetaData ></HelmetMetaData> */}
          <div id="main" className="css-scope tent" ></div >
          <main id="bd_main" >
            <Header />
            <section id="section_aside" className="css-scope section_aside" >
              <aside id="section_leftnav" className="css-scope section_leftnav">
                {/* <LeftNav /> */}
              </aside>
              <aside id="section_rightnav" className="css-scope section_rightnav"></aside>
            </section >
            {/* <Routes /> */}
            <Footer />
          </main>
        </I18nPropvider>
      </StateProvider>
    </div>
  )
}
