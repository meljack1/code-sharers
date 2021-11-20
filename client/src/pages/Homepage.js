import React from 'react';
import { useQuery } from '@apollo/client';
import { SNIPPETS } from '../utils/queries';
import HomepageCard from "../components/HomepageCard";
import Box from '@mui/material/Box';

export default function Homepage() {
    const { loading, data } = useQuery(SNIPPETS, {
        fetchPolicy: "no-cache"
    });

    const snippetList = data?.snippets || [];
    console.log(snippetList)
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