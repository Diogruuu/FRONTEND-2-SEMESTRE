import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

function plainText(html = "") {
    return new DOMParser().parseFromString(html, "text/html").body.textContent || "";
}

export default function ShowDetailsPage() {
    const { id } = useParams();
    const { isFavorite, toggleFavorite } = useFavorites();
    const [show, setShow] = useState(null);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadShow() {
            setStatus("loading");
            setErrorMessage("");
            try {
                const response = await fetch(`https://api.tvmaze.com/shows/${encodeURIComponent(id)}`, { signal: controller.signal });
                if (!response.ok) throw new Error("A série não foi encontrada.");
                const data = await response.json();
                setShow(data);
                setStatus("success");
            } catch (error) {
                if (error.name === "AbortError") return;
                setErrorMessage(error.message || "Confira sua conexão e tente novamente.");
                setStatus("error");
            }
        }

        loadShow();
        return () => controller.abort();
    }, [id]);

    if (status === "loading") return <LoadingState label="Carregando detalhes da série..." />;
    if (status === "error" || !show) {
        return (
            <section className="message-page">
                <span className="eyebrow">SINAL PERDIDO</span>
                <h1>Não encontramos essa série.</h1>
                <p>{errorMessage}</p>
                <Link className="button button-dark" to="/">Voltar ao catálogo <span aria-hidden="true">↗</span></Link>
            </section>
        );
    }

    const saved = isFavorite(show.id);
    const image = show.image?.original || show.image?.medium;
    const description = plainText(show.summary) || "A sinopse desta série ainda não está disponível.";

    return (
        <section className="details-page">
            <Link className="back-link" to="/">← Voltar ao catálogo</Link>
            <div className="details-layout">
                <div className="details-poster-wrap">
                    {image ? <img className="details-poster" src={image} alt={`Pôster da série ${show.name}`} /> : <div className="details-poster poster-placeholder"><span>F.</span><small>SEM PÔSTER</small></div>}
                </div>

                <article className="details-copy">
                    <span className="eyebrow"><span className="eyebrow-dot" /> FICHA DA SÉRIE</span>
                    <h1>{show.name}<span className="heading-period">.</span></h1>
                    <div className="details-tags">
                        {show.premiered && <span>{show.premiered.slice(0, 4)}</span>}
                        {show.status && <span>{show.status}</span>}
                        {show.runtime && <span>{show.runtime} min</span>}
                        {show.rating?.average && <span className="rating"><span aria-hidden="true">★</span> {show.rating.average.toFixed(1)}</span>}
                    </div>
                    <div className="genre-list">{show.genres?.map((genre) => <span className="genre-pill" key={genre}>{genre}</span>)}</div>
                    <p className="details-summary">{description}</p>
                    <div className="details-actions">
                        <button className={`button ${saved ? "button-saved" : "button-dark"}`} type="button" onClick={() => toggleFavorite(show)} aria-pressed={saved}>
                            <span aria-hidden="true">{saved ? "♥" : "♡"}</span> {saved ? "Salva na minha lista" : "Salvar na minha lista"}
                        </button>
                        {show.officialSite && <a className="button button-outline" href={show.officialSite} target="_blank" rel="noreferrer">Site oficial <span aria-hidden="true">↗</span></a>}
                    </div>
                    <div className="details-divider" />
                    <dl className="details-facts">
                        <div><dt>Exibição</dt><dd>{show.network?.name || show.webChannel?.name || "Não informado"}</dd></div>
                        <div><dt>Idioma</dt><dd>{show.language || "Não informado"}</dd></div>
                        <div><dt>Horário</dt><dd>{show.schedule?.days?.join(", ") || "Não informado"}{show.schedule?.time ? ` · ${show.schedule.time}` : ""}</dd></div>
                    </dl>
                </article>
            </div>
        </section>
    );
}
