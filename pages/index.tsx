import type { GetStaticProps, NextPage } from 'next';
import { Grid } from '@nextui-org/react';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon';
import pokeApi from '../api/pokeApi';

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
    console.log(pokemons);

    return (
        <Layout title='Listado de Pokemons'>
            <Grid.Container gap={2} justify='flex-start'>
                {pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </Grid.Container>
        </Layout>
    );
};

// Parametros que la pagina necesita
export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data } = await pokeApi.get<PokemonListResponse>(
        '/pokemon?limit=151',
    );

    //asignacion de imagen y el id a cada pokemon
    const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
        ...poke,
        id: i + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
            i + 1
        }.svg`,
    }));

    https: return {
        props: {
            pokemons,
        },
    };
};

export default HomePage;
