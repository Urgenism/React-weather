import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Container } from '@chakra-ui/layout';
import React from 'react';

import { useHandleInputChange } from 'hooks/useHandleInputValue';

interface ISearchInputProps {
  handleFormSubmit: (value: string) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({ handleFormSubmit }) => {
  const { value, handleChange } = useHandleInputChange();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit(value);
  };

  return (
    <Box p="2" py={{ base: '7', md: '16' }}>
      <form onSubmit={handleSubmit}>
        <Container display="flex" alignItems="center">
          <Input
            placeholder="Search City..."
            color="white"
            value={value}
            onChange={handleChange}
            _placeholder={{ color: 'white' }}
            size="lg"
            borderColor="whiteAlpha.600"
            _focusVisible={{ borderColor: 'white', boxShadow: '0 0 1px white' }}
          />
          <Button size="lg" colorScheme="blackAlpha" type="submit">
            Search
          </Button>
        </Container>
      </form>
    </Box>
  );
};

export default SearchInput;
