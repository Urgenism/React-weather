import { Box, Container } from '@chakra-ui/react';
import React from 'react';

import { sky } from 'assets/images';
import CurrentWeather from 'components/CurrentWeather';
import DailyForecast from 'components/DailyForecast';
import SearchInput from 'components/SearchInput/SearchInput';
import { useHandleSearchParams } from 'hooks/useHandleSearchParams';

const Home: React.FC<{}> = () => {
  const { searchParams, handleFormSubmit } = useHandleSearchParams();

  return (
    <Box
      minHeight="100vh"
      width="100%"
      height="100%"
      backgroundImage={sky}
      backgroundColor="blue.50"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      color="white"
      p={{ md: '10' }}
    >
      <Container
        background="blackAlpha.600"
        maxWidth="6xl"
        p={{ base: '4', md: '6' }}
        height={{ base: '100%', md: 'initial' }}
        minHeight={{ base: '100vh', md: 'initial' }}
      >
        <SearchInput handleFormSubmit={handleFormSubmit} />
        <CurrentWeather searchParams={searchParams} />
        <DailyForecast searchParams={searchParams} />
      </Container>
    </Box>
  );
};

export default Home;
