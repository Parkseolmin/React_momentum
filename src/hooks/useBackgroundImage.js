import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useBackgroundImage() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    () => localStorage.getItem('backgroundImageUrl') || ''
  );

  const url = `https://api.unsplash.com/photos/random?query=dark&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  const fetchImage = useCallback(async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      localStorage.setItem('backgroundImageUrl', data.urls.full);
      localStorage.setItem('lastFetchTime', Date.now());
      return data.urls.full;
    } catch (error) {
      throw new Error('Failed to fetch background image');
    }
  }, [url]);

  const { isLoading, error, refetch } = useQuery({
    queryKey: ['backgroundImage'],
    queryFn: fetchImage,
    enabled: !backgroundImageUrl,
    staleTime: 1000 * 60 * 60 * 5,
    onSuccess: (data) => setBackgroundImageUrl(data),
  });

  useEffect(() => {
    const lastFetchTime = parseInt(localStorage.getItem('lastFetchTime'), 10);

    // 5시간이 지났거나 처음 로드된 경우 refetch() 호출
    if (
      !backgroundImageUrl ||
      Date.now() - lastFetchTime > 1000 * 60 * 60 * 5
    ) {
      refetch();
    }
  }, [backgroundImageUrl, refetch]);

  return { isLoading, error, backgroundImageUrl };
}
