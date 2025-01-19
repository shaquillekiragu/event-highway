import "./Loading.css";

function Loading({ page }) {
  return (
    <div className="loadingComponent">
      <div className="loader"></div>
      <p>
        <em>{page} page loading...</em>
      </p>
    </div>
  );
}

export default Loading;
