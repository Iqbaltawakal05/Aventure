import { fetchAllPromoData } from "@/API/PromoAPI";
import { useEffect, useState } from "react";

export default function Promo() {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        fetchAllPromoData().then((data) => {
            setPromos(data);
        });
    }, []);

    if (!promos) {
        return null;
    }

    return (
        <div className='offers container'>
        <h1>Promos</h1>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            {promos.map((promo, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={promo.id}>
                    <div className="card mb-8">
                        <div className="row g-0">
                            <div className="img-promos col">
                            <img src={promo.imageUrl} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col">
                            <div className="card-promos card-body">
                                <h5 className="card-title">{promo.title}</h5>
                                <p className="card-text">gunakan code <div className="code-promo fw-bold">{promo.promo_code}</div></p>
                                <button>Detail</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
          </div>
          <div className="btn-carousel">
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        </div>
    )
}