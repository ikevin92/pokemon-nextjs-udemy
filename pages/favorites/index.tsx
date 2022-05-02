import React from 'react';
import { NextPage } from 'next';
import { Layout } from '../../components/layouts';

const FavoritesPage: NextPage = () => {
    return (
        <Layout title='Pokemons - Favoritos'>
            <h1>Favorites</h1>
        </Layout>
    );
};

export default FavoritesPage;
