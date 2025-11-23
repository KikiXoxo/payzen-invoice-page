const SkeletonLoader = ({ rows = 7 }) => {
  return (
    <div className='w-full p-6 space-y-4'>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className='flex gap-8'>
          <div className='w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse'></div>
          <div className='w-[80px] h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse'></div>
          <div className='w-[120px] h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse'></div>
          <div className='flex-1 h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse'></div>
          <div className='w-[100px] h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse'></div>
          <div className='w-[120px] h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse'></div>
          <div className='w-[100px] h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse'></div>
          <div className='w-[120px] h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse'></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
