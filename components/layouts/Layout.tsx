import Head from 'next/head';
import { ReactNode } from 'react';
import { Navbar } from '../ui';

interface Props {
    children?: ReactNode | undefined;
    title?: string;
}

export const Layout = ({ children, title }: Props) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name='author' content='Kevin Echeverri' />
                <meta
                    name='description'
                    content={`Informacion sobre el pókemon ${title}`}
                />
                <meta name='keywords' content={`${title}, pokemon, pokedex`} />
            </Head>

            <Navbar />

            <main
                style={{
                    padding: '0px 20px',
                }}>
                {children}
            </main>
        </>
    );
};
