export default function Header() {
    return (
        <header className="container">
            <h1 className="col">Exciting adventure<div className="subhead"> awaits you!</div></h1>
            <form className="search d-flex" role="search">
              <input className="form-control" type="search" placeholder="search destinations" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </header>
    )
}