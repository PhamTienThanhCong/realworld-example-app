import Feed from "./Feed"

export default function ListFeed({feeds}: {feeds: any}) {
    return (
        <ul className="list">
            {feeds.map((feed: any, index: number) => (
                <Feed key={`feed-${index}`} feed={feed} />
            ))}
        </ul>
    )
}