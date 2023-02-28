import { useGetAlbumsQuery } from '../services/jsonServerApi';

export default function Albums() {
  const { data: albums } = useGetAlbumsQuery(1);

  return (
    <ul>
      {albums?.map((album) => (
        <li key={album.id}>
          {album.id} - {album.title}
        </li>
      ))}
    </ul>
  );
}
