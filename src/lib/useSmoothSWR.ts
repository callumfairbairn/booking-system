import { useEffect, useRef } from 'react';
import useSWR, { BareFetcher, Key } from 'swr';

// After loading data for the first time, subsequent API calls don't return data = undefined.
// It returns the previous value until there is a new value.
export function useSmoothSWR<T> (key: Key, fetcher: BareFetcher<T> | null) {
  const { data, ...rest } = useSWR(key, fetcher)
  const smoothDataRef = useRef<T>();

  if (data === undefined) {
    return { data: smoothDataRef.current, ...rest }
  }
  
  smoothDataRef.current = data
  return { data, ...rest }
}