'use client';

import ErrorMain from '../ui/error-main';
import data from '@/app/lib/appData.json';

export default function Error() {
  // if db error occurs
  const { errorMsg } = data;
  return <ErrorMain message={errorMsg} />;
}
