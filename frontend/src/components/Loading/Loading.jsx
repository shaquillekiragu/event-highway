import "./Loading.css";

function Loading({ page }) {
  return (
    <>
      <div className="loader"></div>
      <p>
        <em>{page} page loading...</em>
      </p>
    </>
  );
}

export default Loading;
