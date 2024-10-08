import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export function useBackgroundImage() {
  // 로컬스토리지에서 배경 이미지와 저장된 시간을 가져옵니다.
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    () => localStorage.getItem('backgroundImageUrl') || ''
  );

  const url = `https://api.unsplash.com/photos/random?query=dark&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;

  // API를 통해 배경 이미지를 가져오는 함수
  const fetchImage = useCallback(async () => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      // 배경 이미지 URL과 현재 시간을 로컬스토리지에 저장
      localStorage.setItem('backgroundImageUrl', data.urls.full);
      localStorage.setItem('lastFetchTime', Date.now());
      return data.urls.full;
    } catch (error) {
      throw new Error('Failed to fetch background image');
    }
  }, [url]);

  // React Query를 사용하여 데이터를 관리
  const { isLoading, error, refetch } = useQuery({
    queryKey: ['backgroundImage'],
    queryFn: fetchImage,
    enabled: !backgroundImageUrl, // backgroundImageUrl이 없을 때만 API 호출
    staleTime: 1000 * 60 * 60 * 5, // 데이터가 5시간 동안 신선하다고 간주됨
    onSuccess: (data) => setBackgroundImageUrl(data), // 성공 시 상태 업데이트
  });

  // 이 부분에서 첫 방문자나 오래된 데이터를 체크
  useEffect(() => {
    const lastFetchTime = parseInt(localStorage.getItem('lastFetchTime'), 10);

    // 5시간이 지났거나 처음 로드된 경우 refetch() 호출
    if (
      !backgroundImageUrl ||
      Date.now() - lastFetchTime > 1000 * 60 * 60 * 5
    ) {
      refetch(); // 필요할 때만 API를 호출함
    }
  }, [backgroundImageUrl, refetch]);

  return { isLoading, error, backgroundImageUrl };
}
