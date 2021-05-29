import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam = null }) => {
       const response = await api.get('/images', {
        params: {
          after: pageParam
        }
      })

      return response.data
    },
    {
      getNextPageParam: (lastPage) => {
        console.log('last', lastPage.after)
        if (!lastPage.after) {
          return null
        }

        return lastPage.after
        
      }
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(page => page.data).flat()
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return (
      <Loading />
    )
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return (
      <Error />
    )
  }


  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        { 
        hasNextPage 
        &&
        <Button
          my={6}
          isLoading={isFetchingNextPage}
          loadingText="Carregando..."
          isDisabled={!hasNextPage}
          onClick={() => fetchNextPage()}
          w="134px"
          h="40px"
          py={6}
        >
          Carregar Mais
        </Button>
        }
      </Box>
    </>
  );
}
