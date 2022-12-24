import { Image } from '@chakra-ui/image';
import { Box, Text, Heading, SimpleGrid, Flex } from '@chakra-ui/layout';
import React from 'react';

import { useFetchDailyForecast } from 'hooks/api/useFetchDailyForecast';
import { IWeatherSearchParams } from 'type';
import { formatDateToDay } from 'utils/format';

interface IDailyForecastProps {
  searchParams: IWeatherSearchParams;
}

const Forecast: React.FC<IDailyForecastProps> = ({ searchParams }) => {
  const { data, status, error } = useFetchDailyForecast(searchParams);

  if (status !== 'success') return null;

  return (
    <Box mt="8">
      <Heading mb="4">Daily Forecast</Heading>
      <SimpleGrid columns={{ base: 1, lg: 5 }} spacing={{ base: 0, md: 2 }}>
        {Array.isArray(data?.list) && data?.list.length
          ? data.list.map((item: any) => {
              return (
                <Flex
                  key={item.dt}
                  textAlign="center"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection={{ base: 'row', lg: 'column' }}
                >
                  <Text fontSize={{ base: 'md', lg: '2xl' }} fontWeight="bold">
                    {formatDateToDay(new Date(item.dt_txt))}
                  </Text>

                  <Flex justifyContent="center">
                    <Image
                      src={'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png'}
                      alt={item.weather[0].description}
                      boxSize="50px"
                    />
                  </Flex>

                  <Text fontWeight="bold" fontSize={{ base: 'sm', lg: 'md' }}>
                    {item.main.temp_max} / {item.main.temp_min} &#8451;
                  </Text>
                  <Text display={{ base: 'none', sm: 'block' }}>{item.weather[0].main}</Text>
                </Flex>
              );
            })
          : null}
      </SimpleGrid>
    </Box>
  );
};

export default Forecast;
