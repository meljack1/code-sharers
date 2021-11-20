import React from 'react';
import { useQuery } from '@apollo/client';
import { SNIPPETS } from '../utils/queries';
import HomepageCard from "./HomepageCard";
import Box from '@mui/material/Box';

export default function Home() {
    const { loading, data } = useQuery(SNIPPETS, {
        fetchPolicy: "no-cache"
    });

    const snippetList = data?.snippets || [];
    
  return (
    <Box>
        {snippetList.map((snippet) => {
            return (
                HomepageCard(snippet)
            )
        })}
    </Box>
  );
}