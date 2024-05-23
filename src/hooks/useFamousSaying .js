import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { kadvice } from 'kadvice';

const useFamousSaying = () => {
  const [isEnabled, setIsEnabled] = useState(true); // 초기에는 enabled를 true로 설정

  const fetchSaying = () => {
    const advice = kadvice.getOne();
    localStorage.setItem('famousSaying', JSON.stringify(advice));
    localStorage.setItem('lastSayingFetchTime', Date.now());
    return advice;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['famousSaying'],
    queryFn: fetchSaying,
    enabled: isEnabled,
    onSuccess: () => setIsEnabled(false), // 데이터를 성공적으로 가져온 후 enabled를 false로 설정
  });

  // 쿼리를 수동으로 실행하기 위한 함수
  const fetchSayingManually = () => {
    setIsEnabled(true); // enabled를 true로 설정하여 쿼리를 다시 활성화
    refetch(); // 쿼리를 수동으로 실행
  };

  // 데이터를 성공적으로 가져온 후, 다음 실행을 위해 isEnabled를 다시 false로 설정
  useEffect(() => {
    if (data) {
      setIsEnabled(false);
    }
  }, [data]);

  return { data, isLoading, error, fetchSayingManually };
};

export default useFamousSaying;
