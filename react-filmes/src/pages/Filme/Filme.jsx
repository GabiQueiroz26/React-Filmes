import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";

const Filme = () => {
  const [filme, setFilme] = useState({});
  const [detalhesVisiveis, setDetalhesVisiveis] = useState(false);
  const params = useParams();
  const url_image = "https://image.tmdb.org/t/p/w400";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDUxNGE2YWI0Yjg4ZGY0NWZmZTNmNWQ4Nzk2NzZkNiIsInN1YiI6IjY0ZjAwM2QxY2FhNTA4MDBlOTUxNjZjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.59SDvErSwX-F6-slLHwL3w1vtXW36Ks0baQ7jBs54IU";
        const url = `https://api.themoviedb.org/3/movie/${params.id}?append_to_response=credits&language=pt-BR`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        setFilme(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [params.id]);

  const toggleDetails = () => {
    setDetalhesVisiveis(!detalhesVisiveis);
  };

  return (
    <div className="font-sans bg-gray-100 flex flex-col min-h-screen">
      <Menu />
  
      <div className="container mx-auto flex-grow p-4">
        <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md">
          {filme && (
            <div className="movie-details-container">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex justify-center mb-4 lg:mb-0">
        
                    <div className="poster-container">
                      <img
                        src={`${url_image}${filme.poster_path}`}  
                        className="poster-image"
                      />
                    </div>
                </div>
  
                <div className="lg:ml-8 mt-4 lg:mt-0">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-4">{filme.title}</h1>  
  
                  <h3 className="font-bold italic text-lg mt-4">Sinopse</h3>
                  <p className="movie-overview mb-4">{filme.overview}</p>
  
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleDetails}
                  >
                    {detalhesVisiveis ? "Ocultar Detalhes" : "Mostrar Detalhes"}
                  </button>
  
                  {detalhesVisiveis && (
                    <div className="additional-details mt-4">
                      <h3 className="font-bold italic text-md"></h3>

                    <div className="movie-genres mb-4">
                      <h3 className="font-bold">Generos:</h3>
                      <p>{filme.genres.reduce((acc, genre) => acc === '' ? genre.name : `${acc} - ${genre.name}`, '')}</p>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between mb-4 text-lg">
                      <div className="movie-rating"><strong>Avaliação:</strong> {filme.vote_average}</div>
                    </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 border-t-2 border-gray-300 pt-6">
                  <div className="cast-section mb-4">
                    <button
                      className="cast-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={toggleDetails}
                    >
                      {detalhesVisiveis ? "Ocultar Elenco" : "Mostrar Elenco"}
                    </button>
  
                    {detalhesVisiveis && (
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
                        {filme.credits.cast.reduce((acc, actor) => {
                          if (actor.known_for_department === "Acting") {
                            acc.push(
                              <div key={actor.id} className="actor-details text-center mb-4">
                                <>
                                  <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    className="actor-image mx-auto"
                                  />
                                  <p className="font-bold">
                                    <b1>{actor.name}</b1>
                                    <br />
                                  </p> {actor.character}
                                </>
                              </div>
                            );
                          }
                          return acc;
                        }, [])}
                      </div>
                    )}
                  </div>
              
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}  

export default Filme;
