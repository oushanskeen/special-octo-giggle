import { useState } from 'react'
import { useGetAlbumsQuery } from '../../services/jsonServerApi';

let albums = []

export default function CRUD_albums() {

    const [page, setPage] = useState(1);

    const {
      data: albums = [],
      isLoading,
      isFetching,
      isError,
      error,
    } = useGetAlbumsQuery(page);

    if (isLoading || isFetching) {
      return <div>loading...</div>;
    }

    if (isError) {
      console.log({ error });
      return <div>{error.status}</div>;
    }

    return (
      <div>
          <ul>
            {albums.map((album) => (
              <li key={album.id}>
                {album.id} - {album.title}
              </li>
            ))}
          </ul>
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <button
            disabled={albums.length < 10}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
      </div>
    );
  }
