import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, LinearProgress, TextField, Tooltip, Typography, CircularProgress } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import Grid2 from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import NewsCard from './components/NewsCard';
import './App.css';

// Define the type for articles
interface Article {
  id: number;
  title: string;
  link: string;
  urlToImage: string;
  description: string;
  sentimentScore: number;
  fakeNews: boolean;
  mostCommonWord: string;
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

// Define stopwords (common words to ignore)
const stopwords = new Set([
  "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
  "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself",
  "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which",
  "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be",
  "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the",
  "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with",
  "about", "against", "between", "into", "through", "during", "before", "after", "above", "below",
  "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then",
  "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too",
  "very", "s", "t", "can", "will", "just", "don", "should", "now", "d", "ll", "m", "o", "re", "ve",
  "y", "ain", "aren", "couldn", "didn", "doesn", "hadn", "hasn", "haven", "isn", "ma", "mightn", "mustn",
  "needn", "shan", "shouldn", "wasn", "weren", "won", "wouldn"
]);

// Utility function to get the most common keyword
const getMostCommonKeyword = (description: string) => {
  // Tokenize the description into words
  const words = description.toLowerCase().split(/\s+/);

  // Filter out stopwords and non-alphabetical characters
  const filteredWords = words.filter(word => word.match(/[a-zA-Z]+/) && !stopwords.has(word));

  // Count the frequency of each word
  const wordCount = {};
  filteredWords.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Find the most common word
  let mostCommonWord = null;
  let maxCount = 0;

  for (let word in wordCount) {
    if (wordCount[word] > maxCount) {
      mostCommonWord = word;
      maxCount = wordCount[word];
    }
  }

  return mostCommonWord;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    // Use searchQuery to fetch articles or perform other actions
  };

  // Fetch articles when the search button is clicked
  const fetchArticles = async () => {
    setArticles([]);
    setLoading(true); // Start loading

    if (!searchQuery) return;
    try {
      handleSearch();
      
      // Simulate a 7-second delay
      setTimeout(async () => {
        const response = await fetch(
          `/api/articles?query=` + searchQuery
        );
        const data = await response.json();
        console.log(data);

        // Extract and store the first 5 articles
        const fetchedArticles = data.map((article, index) => ({
          id: index,
          title: article.title,
          link: article.url,
          urlToImage: article.urlToImg,
          description: article.description,
          sentimentScore: article.sentimentScore,
          fakeNews: article.fakeNewsWarning,
          mostCommonWord: article.description ? getMostCommonKeyword(article.description) : '',
        }));
        setArticles(fetchedArticles);
        setLoading(false); // Stop loading after articles are fetched
      }, 7000); // 7-second delay
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
      {/* Title */}
      <Box sx={{ flexGrow: 1, marginBottom: 10, display: 'flex', alignItems: 'center' }}>
        <img src="./public/verinews-logo.svg" alt="VeriNews Logo" width="500px" height="auto" style={{ maxWidth: "500px" }} />
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
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' },
              },
            }}
          />
        </Grid2>
        <Grid2 xs={3} md={2}>
          <Button
            variant="contained"
            fullWidth onClick={fetchArticles}
            sx={{ backgroundColor: '#024188', color: 'white' }}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>

      {/* Show loader if articles are being fetched */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <CircularProgress />
        </Box>
      )}

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

            {/* Sentiment Score Meter */}
            {article.sentimentScore !== 0 && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2">Sentiment Score</Typography>
                <Typography variant="body2">Keyword: {article.mostCommonWord}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.abs(article.sentimentScore * 100)} // Assuming sentiment_score is between -1 and 1
                  sx={{
                    height: 10,
                    backgroundColor: '#ccc',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: article.sentimentScore >= 0 ? '#4caf50' : '#f44336', // Green for positive, Red for negative
                    },
                  }}
                />
              </Box>
            )}

            {/* Fake News Warning */}
            {article.fakeNews && (
              <Tooltip title="Caution, this article has been flagged as fake news" arrow>
                <WarningIcon
                  sx={{
                    color: 'red',
                    fontSize: 40,
                    animation: 'flash 1s infinite',
                    '&:hover': { cursor: 'pointer' },
                  }}
                />
              </Tooltip>
            )}
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}