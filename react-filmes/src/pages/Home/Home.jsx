// Home/Home.jsx

import { useEffect, useState } from "react";
import Menu from "../../components/Menu";

export default function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDUxNGE2YWI0Yjg4ZGY0NWZmZTNmNWQ4Nzk2NzZkNiIsInN1YiI6IjY0ZjAwM2QxY2FhNTA4MDBlOTUxNjZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59SDvErSwX-F6-slLHwL3w1vtXW36Ks0baQ7jBs54IU";

        let options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        }

        let url = "https://api.themoviedb.org/3/movie/popular";
        fetch(url, options)
            .then(resp => resp.json())
            .then(data => setFilmes(data.results))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <Menu />
            <div className="container bg-white shadow p-4 mx-auto">
                <h1 className="text-4xl font-bold my-4 text-slate-800">Populares</h1>

                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                    {filmes.map(filme => (
                        <div key={filme.id}>
                            <a href={'/filme/' + filme.id}>
                                <img src={"https://image.tmdb.org/t/p/w500/" + filme.poster_path} />
                                <h3 className="text-xl font-semibold text-center text-slate-800">
                                    {filme.title}
                                </h3>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}