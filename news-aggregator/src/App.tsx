import { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Typography }from '@mui/material';
import Grid2 from '@mui/material/Grid2'
import Paper from '@mui/material/Paper';
import './App.css'
import NewsCard from './components/NewsCard';

// Define the type for articles
interface Article {
  id: number;
  title: string;
  link: string;
  urlToImage: string;
  description: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    // Use searchQuery to fetch articles or perform other actions
  };

  // Fetch articles when the search button is clicked
  const fetchArticles = async () => {
    if (!searchQuery) return;
    try {
      handleSearch();
      const response = await fetch(
        `/articles?query=` + searchQuery
      );
      const data = await response.json();

      // Extract and store the first 5 articles
      const fetchedArticles = data.articles.slice(0, 5).map((article, index) => ({
        id: index,
        title: article.title,
        link: article.url,
        urlToImage: article.urlToImage,
        description: article.description,
      }));
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, alignItems: 'center'}}>
    {/* Title */}
    <Box sx={{ flexGrow: 1, padding: 2, marginBottom: 10}}>
      <Typography variant="h4" gutterBottom>
        My Search App
      </Typography>
    </Box>

    {/* Search bar and button */}
    <Grid2 container spacing={2} alignItems="center">
      <Grid2 xs={9} md={10}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search"
          placeholder="Type your query here"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Grid2>
      <Grid2 xs={3} md={2}>
        <Button variant="contained" color="primary" fullWidth onClick={fetchArticles}>
          Search
        </Button>
      </Grid2>
    </Grid2>

    {/* Space below */}
    <Box sx={{ height: 16, marginTop: 10}} />

    {/* Space below */}
    <Box sx={{ height: 16, marginTop: 10 }} />

    {/* Display articles */}
    <Grid2 container spacing={4}>
      {articles.map((article) => (
        <Grid2 xs={12} md={6} key={article.id}>
          <NewsCard
            id={article.id}
            title={article.title}
            link={article.link}
            urlToImage={article.urlToImage}
            description={article.description}
          />
        </Grid2>
      ))}
    </Grid2>
    </Box>
  );
} 
