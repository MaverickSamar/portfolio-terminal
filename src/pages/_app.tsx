import { createInstance, MatomoProvider } from '@jonkoops/matomo-tracker-react';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import {Layout} from '../components/layout';
import '../styles/global.css';
import { ShellProvider } from '../utils/shellProvider';
import { ThemeProvider } from '../utils/themeProvider';

const App = ({ Component, pageProps}) => {
    const inputRef = React.useRef<HTMLInputElement>({} as HTMLInputElement);

    const onClickAnywhere = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        localStorage.setItem('visitedAt', new Date().toString());
    }, []);

    return(
        <ThemeProvider>
            <ShellProvider>
                <Head>
                    <meta name="viewport"
                    content="initial-scale=1.0, width=device-width" key="viewport"/>
                </Head>
                <Layout onClick={onClickAnywhere}>
          <Component {...pageProps} inputRef={inputRef} />
        </Layout>
            </ShellProvider>
        </ThemeProvider>
    );
};

export default (props) => {
    const ENABLE_TRACKING = Boolean(process.env.NEXT_PUBLIC_ENABLE_TRACKING);

    if(!ENABLE_TRACKING){
        return <App {...props}/>;
    }

    const instance = createInstance({
        urlBase: 'https://localhost:3000',
        trackerUrl: `${process.env.NEXT_PUBLIC_TRACKING_URL}/js/`,
        srcUrl: `${process.env.NEXT_PUBLIC_TRACKING_URL}/js/`,
        siteId: 1,
        configurations: {
            setRequestMethod: 'GET',
        },
    });

    return (
        <MatomoProvider value={instance}>
            <App {...props}/>
        </MatomoProvider>
    );
};
