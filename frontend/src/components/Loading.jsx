function Loading({ page }) {
  return (
    <article className="flex justify-center items-center w-full h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mb-4"></div>
        <p aria-live="polite" className="text-xl font-semibold text-gray-700">
          <em>{`${page || ""} `}Page loading...</em>
        </p>
      </div>
    </article>
  );
}

export default Loading;
