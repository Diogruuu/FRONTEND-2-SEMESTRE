import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowCard from "../components/ShowCard.jsx";
import LoadingState from "../components/LoadingState.jsx";

const INITIAL_QUERY = "the office";

export default function CatalogPage() {
    const [inputValue, setInputValue] = useState(INITIAL_QUERY);
    const [searchTerm, setSearchTerm] = useState(INITIAL_QUERY);
    const [shows, setShows] = useState([]);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState("");
    const [formMessage, setFormMessage] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function searchShows() {
            setStatus("loading");
            setErrorMessage("");
            try {
                const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`;
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) throw new Error("Não foi possível buscar as séries agora.");
                const data = await response.json();
                setShows(data.map((result) => result.show));
                setStatus("success");
            } catch (error) {
                if (error.name === "AbortError") return;
                setErrorMessage(error.message || "Confira sua conexão e tente novamente.");
                setStatus("error");
            }
        }

        searchShows();
        return () => controller.abort();
    }, [searchTerm, retryCount]);

    function handleSubmit(event) {
        event.preventDefault();
        const cleanQuery = inputValue.trim();
        if (!cleanQuery) {
            setFormMessage("Digite o nome de uma série para começar.");
            return;
        }
        setFormMessage("");
        setSearchTerm(cleanQuery);
    }

    return (
        <>
            <section className="hero">
                <div className="hero-copy">
                    <span className="eyebrow"><span className="eyebrow-dot" /> SEU PRÓXIMO PLAY COMEÇA AQUI</span>
                    <h1>Tem série que<br />fica com a gente<span className="heading-period">.</span></h1>
                    <p>Encontre uma história nova. Ou volte para aquela que você nunca superou.</p>
                </div>
                <div className="hero-stamp" aria-hidden="true">
                    <span className="stamp-top">SINTONIZE</span>
                    <span className="stamp-symbol">↗</span>
                    <span className="stamp-bottom">SUA PRÓXIMA SÉRIE</span>
                </div>
            </section>

            <section className="search-section" aria-labelledby="search-heading">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">CATÁLOGO</span>
                        <h2 id="search-heading">O que vamos assistir?</h2>
                    </div>
                    <span className="section-index">01 / 03</span>
                </div>

                <form className="search-form" onSubmit={handleSubmit}>
                    <label className="sr-only" htmlFor="show-search">Nome da série</label>
                    <span className="search-icon" aria-hidden="true">⌕</span>
                    <input
                        id="show-search"
                        type="search"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Ex.: The Bear, Succession..."
                    />
                    <button className="button button-dark" type="submit">Buscar <span aria-hidden="true">↗</span></button>
                </form>
                {formMessage && <p className="form-message" role="alert">{formMessage}</p>}

                <div className="results-heading">
                    <p>
                        {status === "success" ? <><strong>{shows.length}</strong> resultado{shows.length === 1 ? "" : "s"} para <strong>“{searchTerm}”</strong></> : "Séries para você"}
                    </p>
                    <Link to="/favoritos">Ver minha lista <span aria-hidden="true">↗</span></Link>
                </div>

                {status === "loading" && <LoadingState label="Sintonizando o catálogo..." />}
                {status === "error" && (
                    <div className="empty-state" role="alert">
                        <span className="empty-icon">!</span>
                        <h3>Não conseguimos sintonizar.</h3>
                        <p>{errorMessage}</p>
                        <button className="text-button" type="button" onClick={() => setRetryCount((count) => count + 1)}>Tentar novamente</button>
                    </div>
                )}
                {status === "success" && shows.length === 0 && (
                    <div className="empty-state">
                        <span className="empty-icon">⌕</span>
                        <h3>Nenhuma série encontrada.</h3>
                        <p>Tente buscar por outro título ou confira a escrita.</p>
                    </div>
                )}
                {status === "success" && shows.length > 0 && (
                    <div className="show-grid">
                        {shows.map((show, index) => <ShowCard key={show.id} show={show} index={index} />)}
                    </div>
                )}
            </section>

            <section className="callout-strip">
                <span className="callout-icon" aria-hidden="true">✳</span>
                <p>Uma série boa merece <em>entrar para a lista.</em></p>
                <Link className="callout-link" to="/favoritos">Ver meus favoritos <span aria-hidden="true">↗</span></Link>
            </section>
        </>
    );
}
