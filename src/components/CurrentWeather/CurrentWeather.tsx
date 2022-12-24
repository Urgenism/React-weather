import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Image } from '@chakra-ui/image';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/layout';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';
import { Spinner } from '@chakra-ui/spinner';
import React from 'react';

import { useFetchCurrentWeathers } from 'hooks/api/useFetchCurrentWeather';
import { IWeatherSearchParams } from 'type';
import { formatUnixTimestamp } from 'utils/format';

interface ICurrentWeatherProps {
  searchParams: IWeatherSearchParams;
}

const CurrentWeather: React.FC<ICurrentWeatherProps> = ({ searchParams }) => {
  const { status, data, error } = useFetchCurrentWeathers(searchParams);

  if (error)
    return (
      <Alert status="error" color="InfoText">
        <AlertIcon />
        {(error as any)?.message}
      </Alert>
    );

  return (
    <Flex color="white" textAlign="center" flexDir="column" alignItems="center" margin="auto" p="2" maxWidth="400px">
      {status === 'loading' ? (
        <Flex alignItems="center" flexDirection="column" width="100%" textAlign="center">
          <Skeleton height="30px" mb="4" width="50%" />
          <Skeleton height="40px" mb="4" width="60%" />
          <Skeleton height="25px" mb="3" width="30%" />
          <Skeleton height="20px" mb="3" width="40%" />
          <Divider my="2" />
          <SkeletonText noOfLines={3} skeletonHeight="2" spacing="3" width="50%" mt="2" />
        </Flex>
      ) : (
        <>
          <Heading size="lg">
            {data?.name}, {data?.sys.country}
          </Heading>
          <Flex alignItems="center" flexDirection={{ base: 'column', sm: 'row' }}>
            <Image
              src={'http://openweathermap.org/img/w/' + data?.weather[0].icon + '.png'}
              alt={data?.weather[0].description}
              boxSize="80px"
            />
            <Text fontSize="5xl">{data?.main.temp} &#8451;</Text>
          </Flex>
          <Text fontSize="2xl">{data?.weather[0].main}</Text>
          <Text fontSize="xl">{formatUnixTimestamp(data?.dt)}</Text>
          <Divider my="2" />
          <Text>Feels Like: {data?.main.feels_like} &#8451;</Text>
          <Text>Humidiy: {data?.main.humidity} %</Text>
          <Text>Pressure: {data?.main.pressure} hPa</Text>
        </>
      )}
    </Flex>
  );
};

export default CurrentWeather;
