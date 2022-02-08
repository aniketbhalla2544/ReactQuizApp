const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div className='border-4 border-red-500'>
      <p>Something went wrong:</p>
      <p className='text-red-600'>{error.message}</p>
      <button onClick={resetErrorBoundary}>Reset UI</button>
    </div>
  );
};

export default ErrorFallback;
