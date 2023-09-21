import { useEffect } from 'react';

function ImagesFromContentHubOne() {

    
  useEffect(() => {
    async () => {
      const url = '/api/media/fetchAllMediaItems';
      const response = await fetch(url);
      const data = response.json();
    };
  });
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <img className="h-auto max-w-full rounded-lg" src="" />
      </div>
    </div>
  );
}

export default ImagesFromContentHubOne;
