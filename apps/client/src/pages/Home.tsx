import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";

export type Film = {
  title: string;
  cover: string;
  id: number;
};

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useDebounce(searchTerm, 1000);
  const [searchedFilms, setSearchedFilms] = useState<Film[]>();
  const [films, setFilms] = useState<{
    trending: Film[];
    forYou: Film[];
    recent: Film[];
  }>({
    trending: [],
    forYou: [],
    recent: [],
  });

  useEffect(() => {
    fetch("http://localhost:3000/get-dashboard-films")
      .then((res) => res.json())
      .then((data) => setFilms(data));
  }, []);

  useEffect(() => {
    if (value !== "") {
      fetch(`http://localhost:3000/search?searchTerm=${value}`)
        .then((res) => res.json())
        .then((data) => setSearchedFilms(data.films));
    } else {
      setSearchedFilms(undefined);
    }
  }, [value]);

  return (
    <div className="grid gap-5">
      <input
        className="p-4 text-black"
        placeholder="Search for a film"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        {searchedFilms?.map((film) => (
          <Link
            to={`/film/${film.id}`}
            key={film.title}
            className="hover:scale-105 cursor-pointer transition-transform duration-300"
          >
            <img
              src={film.cover}
              alt={film.title}
              className="object-cover w-full"
            />
          </Link>
        ))}
      </ul>

      <h2 className="text-2xl">Recent</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        {films.recent.map((film) => (
          <Link
            to={`/film/${film.id}`}
            key={film.title}
            className="hover:scale-105 cursor-pointer transition-transform duration-300"
          >
            <img
              src={film.cover}
              alt={film.title}
              className="object-cover w-full"
            />
          </Link>
        ))}
      </ul>

      <h2 className="text-2xl">Trending now</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        {films.trending.map((film) => (
          <Link
            to={`/film/${film.id}`}
            key={film.title}
            className="hover:scale-105 cursor-pointer transition-transform duration-300"
          >
            <img
              src={film.cover}
              alt={film.title}
              className="object-cover w-full"
            />
          </Link>
        ))}
      </ul>

      <h2 className="text-2xl">Picked for you</h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        {films.forYou.map((film) => (
          <li
            key={film.title}
            className="hover:scale-105 cursor-pointer transition-transform duration-300"
          >
            <img
              src={film.cover}
              alt={film.title}
              className="object-cover w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
