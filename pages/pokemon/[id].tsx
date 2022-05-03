import { useState } from 'react';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import { getPokemonInfo, localFavorites } from '../../utils';
import { Pokemon } from '../../interfaces/';
import pokeApi from '../../api/pokeApi';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState(
        localFavorites.existInFavorites(pokemon.id),
    );

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);
        confetti;

        if (isInFavorites) return;

        confetti({
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: { y: 0.2, x: 1 },
        });
    };

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card
                        hoverable
                        css={{
                            padding: '30px',
                        }}>
                        <Card.Image
                            src={
                                pokemon.sprites.other?.dream_world
                                    .front_default || '/no-image.png'
                            }
                            alt={pokemon.name}
                            width='100%'
                            height={200}
                        />
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header
                            css={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <Text h1 transform='capitalize'>
                                {pokemon.name}
                            </Text>
                            <Button
                                color='gradient'
                                onClick={onToggleFavorite}
                                ghost={!isInFavorites}>
                                {isInFavorites
                                    ? 'Quitar de favoritos'
                                    : 'Agregar a favoritos'}
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row' display='flex'>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    //generar arreglo de numeros
    const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

    return {
        paths: pokemons151.map((id) => ({
            params: { id },
        })),
        fallback: 'blocking',
        // fallback: false, // muestra error 404
    };
};

// Parametros que la pagina necesita
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };

    const pokemon = await getPokemonInfo(id);

    // redireccionar si no existe el pokemon
    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            pokemon,
        },
        revalidate: 86400, // cada dia
    };
};

export default PokemonPage;
