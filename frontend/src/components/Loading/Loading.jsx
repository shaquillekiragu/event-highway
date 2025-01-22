import "./Loading.css";

function Loading({ page }) {
  return (
    <div className="loadingComponent">
      <p>
        <em>{page} page loading...</em>
      </p>
    </div>
  );
}

export default Loading;
