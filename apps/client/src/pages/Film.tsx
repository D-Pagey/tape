import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Film } from "./Home";

export function Film() {
  const { filmId } = useParams();

  const [film, setFilm] = useState<Film>();

  useEffect(() => {
    fetch(`http://localhost:3000/get-film/${filmId}`)
      .then((res) => res.json())
      .then((data) => setFilm(data));
  }, [filmId]);

  return <div>FILM PAGE - {JSON.stringify(film)}</div>;
}
