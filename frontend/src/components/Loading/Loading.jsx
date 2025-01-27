import "./Loading.css";

function Loading({ page }) {
  return (
    <article className="loadingComponent">
      <p aria-live="polite">
        <em>{`${page || ""} `}Page loading...</em>
      </p>
    </article>
  );
}

export default Loading;
