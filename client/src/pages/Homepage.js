import React from 'react';
import { useQuery } from '@apollo/client';
import {Box, Typography, Container, Divider} from '@mui/material';

import { SNIPPETS } from '../utils/queries';
import HomepageCard from "../components/HomepageCard";

export default function Homepage() {
    const { loading, data } = useQuery(SNIPPETS, {
        fetchPolicy: "no-cache"
    });

    const snippetList = data?.snippets || [];
    console.log(snippetList)
  return (
    <Container sx={{ borderLeft: 1, borderRight: 1, pt: 3, backgroundColor: "white", minHeight: "calc(100vh - 64px)" }}>
        <Typography variant="h2" sx={{ pb: 3 }}>
            Most recent posts:
        </Typography>
        <Divider />
        <Box>
            {snippetList.map((snippet) => {
                return (
                    HomepageCard(snippet)
                )
            })}
        </Box>
    </Container>
  );
}