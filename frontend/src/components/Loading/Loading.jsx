import "./Loading.css";

function Loading({ page }) {
  return (
    <article className="loadingComponent">
      <p>
        <em>{page} page loading...</em>
      </p>
    </article>
  );
}

export default Loading;
