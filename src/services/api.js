import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/?';
const KEY = '33319957-e5644aada7d51fb110ddf6361';

export async function fetchImages (searchQuery, queryPage) {
  const searchParams = new URLSearchParams({
    q: searchQuery,
    page: queryPage,
    key: KEY,
    image_type: 'photo',
    orientation: 'orientation',
    per_page: 12,
  });

  const response = await axios.get(`${ENDPOINT}${searchParams}`);
  return await response.data;
  }
