function Loading({ page }) {
  return (
    <article className="flex justify-center items-center w-full h-screen mt-[10%] text-2xl">
      <p aria-live="polite">
        <em>{`${page || ""} `}Page loading...</em>
      </p>
    </article>
  );
}

export default Loading;
