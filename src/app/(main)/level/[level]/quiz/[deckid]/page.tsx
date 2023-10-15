import React from 'react';
import Quiz from '@/src/components/Quiz';
const page = ({ params }: any) => {
  return (
    <div className="px-4">
      <Quiz level={params.level} deckid={params.deckid} />
    </div>
  );
};

export default page;
