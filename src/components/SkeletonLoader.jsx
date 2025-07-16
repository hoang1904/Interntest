function SkeletonLoader() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="w-full h-40 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded mt-2 w-1/4"></div>
    </div>
  );
}

export default SkeletonLoader;