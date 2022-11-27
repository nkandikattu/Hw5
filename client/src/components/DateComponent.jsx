import React from 'react'
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const DateComponent = ({person}) => {
  return (
    <Container maxWidth="sm">
       
        <Button color={"secondary"} variant="contained">Sign Out</Button>
        <p>Name: {person.name}</p>
        <Box
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
    >
      <Link href="#">More Like This</Link>
      <Link href="#">Less Like This</Link>
      <Link href="#">Set up a Date!</Link>
    </Box>
    </Container>
  )
}
