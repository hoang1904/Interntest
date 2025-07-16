import { useState } from 'react';

function CourseCard({ course, onViewDetails, onToggleFavorite, isFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
      <div className="relative w-full h-32 bg-gray-200 rounded overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-gray-500 text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        ) : (
            <img 
              src={course.image} 
              alt={course.title} 
              className={`w-full h-32 object-cover rounded transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
        )}
      </div>
      <h3 className="text-lg font-semibold mt-2 text-gray-800">{course.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{course.description}</p>
      <p className="text-green-600 font-bold mt-2">{course.price.toLocaleString()} VND</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onViewDetails(course)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Xem chi tiết
        </button>
        <button
          onClick={() => onToggleFavorite(course.id)}
          className={`px-4 py-2 rounded transition-colors ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {isFavorite ? '❤️ Bỏ yêu thích' : '🤍 Thêm vào yêu thích'}
        </button>
      </div>
    </div>
  );
}

export default CourseCard;