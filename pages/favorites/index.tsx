import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { FavoritePokemons } from '../../components/pokemon';
import { Layout } from '../../components/layouts';
import { localFavorites } from '../../utils';
import { NoFavorites } from '../../components/ui/NoFavorites';

const FavoritesPage: NextPage = () => {
    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons());
    }, []);

    return (
        <Layout title='Pokemons - Favoritos'>
            {favoritePokemons.length > 0 ? (
                <FavoritePokemons favoritePokemons={favoritePokemons} />
            ) : (
                <NoFavorites />
            )}
  
        </Layout>
    );
};

export default FavoritesPage;
