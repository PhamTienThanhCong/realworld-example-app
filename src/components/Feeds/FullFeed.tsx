import ListFeed from "./ListFeed";
import { Group, Pagination } from '@mantine/core';

function FullFeed({ data }: { data: any }) {
  const pages = Math.ceil(data.articlesCount / 10);
  return (
    <>
      <ListFeed feeds={data.articles} />
      <Pagination.Root 
        total={pages}
        boundaries={3}
        size="lg"
        defaultValue={1}
        onChange={(page) => console.log(page)}
      >
      <Group spacing={10} position="center" mt={20} mb={20} w="100%">
        <Pagination.First />
        <Pagination.Previous />
        <Pagination.Items />
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
    </>
  );
}

export default FullFeed;
