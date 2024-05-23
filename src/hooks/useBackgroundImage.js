import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

export function useBackgroundImage() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    () => localStorage.getItem('backgroundImageUrl') || ''
  );
  // const url = `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_UNSPLASH_API}`;
  const url = `https://api.unsplash.com/photos/random?query=dark&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  const fetchImage = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      localStorage.setItem('backgroundImageUrl', data.urls.full);
      localStorage.setItem('lastFetchTime', Date.now());
      return data.urls.full;
    } catch (error) {
      throw error;
    }
  }, [url]);

  const { isLoading, error } = useQuery({
    queryKey: ['backgroundImage'],
    queryFn: fetchImage,
    enabled:
      !backgroundImageUrl ||
      Date.now() - parseInt(localStorage.getItem('lastFetchTime'), 10) >
        1000 * 60 * 60 * 5,
    staleTime: 1000 * 60 * 60 * 5, // Consider the image data as fresh for 24 hours
    onSuccess: (data) => setBackgroundImageUrl(data),
  });

  useEffect(() => {
    if (!backgroundImageUrl) {
      fetchImage().then(setBackgroundImageUrl).catch(console.error);
    }
  }, [backgroundImageUrl, fetchImage]);

  return { isLoading, error, backgroundImageUrl };
}
