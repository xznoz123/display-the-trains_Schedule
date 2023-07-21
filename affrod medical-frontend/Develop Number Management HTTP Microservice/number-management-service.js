const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8008;

const mergeAndSortUniqueNumbers = (arrays) => {
  const mergedArray = [].concat(...arrays);
  const uniqueArray = Array.from(new Set(mergedArray));
  return uniqueArray.sort((a, b) => a - b);
};

const getNumbersFromUrls = async (urls) => {
  try {
    const promises = urls.map((url) => axios.get(url).then((response) => response.data.numbers));
    const responses = await Promise.allSettled(promises);
    const validResponses = responses
      .filter((response) => response.status === 'fulfilled')
      .map((response) => response.value);

    return mergeAndSortUniqueNumbers(validResponses);
  } catch (error) {
    console.error('Error fetching data from URLs:', error.message);
    return [];
  }
};

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid or missing "url" query parameter.' });
  }

  const numbers = await getNumbersFromUrls(urls);
  res.json({ numbers });
});

app.listen(PORT, () => {
  console.log(`number-management-service is running on port ${PORT}`);
});
