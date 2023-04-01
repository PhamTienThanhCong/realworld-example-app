import ListFeed from "./ListFeed";

function FullFeed() {
  return (
    <>
      <ListFeed />
      <ul className="Pagination">
        {/* for 1 to 20 */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item, index) => (
          <li
            key={`pagination-${index}`}
            className={index === 0 ? "page page-focus" : "page"}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </>
  );
}

export default FullFeed;
