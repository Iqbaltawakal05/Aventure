import { fetchActivityById } from "@/API/ActivityAPI";
import Layout from "@/Components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ActivityDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [Activity, setActivity] = useState({});

    useEffect(() => {
        if (id) {
            fetchActivityById(id).then((data) => {
                setActivity(data);
            });
        }

    }, [id]);

     const formatPrice = (price) => {
    if (typeof price !== 'undefined') {
        let priceString = price.toString();
        let priceArray = priceString.split('');
        let formattedPrice = '';

        for (let i = 0; i < priceArray.length; i++) {
            if ((priceArray.length - i) % 3 === 0 && i !== 0) {
                formattedPrice += '.';
            }
            formattedPrice += priceArray[i];
        }

        formattedPrice = 'Rp ' + formattedPrice;

        return formattedPrice;
    } else {
        return 'Rp 0'; // Atau nilai default lainnya jika price tidak ada
    }
    };


    return (
        <div className="container">
            {Activity && (
                <Layout>
                    <div className="back-buttonid">
                        <div className="d-flex gap-3">
                            <a href="/activity"><i class="bi bi-chevron-left"></i></a>
                            <div>
                                <a href="/activity">{Activity.title}</a>
                            <div className="location-vacations">
                                <p className="city-vacations">{Activity.city}</p>
                                <p className="province-vacations">{Activity.province}</p>
                            </div>
                            </div>
                        </div>
                        <div className="ratingActivity">
                                <p className="rating-vacations">{Activity.rating} <i className="bi bi-star-fill"></i> / {Activity.total_reviews} reviews</p>
                        </div>
                    </div>
                        <div className='row'>
                            <div className='imageActivityId col-md-7'>
                                <img src={Activity.imageUrls} alt={Activity.title} />
                            </div>
                            <div className='prices col-md-5'>
                                    <p>{Activity.title}</p>
                                <div className="d-flex normal-price">
                                    <h4>Normal price</h4>
                                    <div className="d-flex original-prices">
                                    <h6>{formatPrice(Activity.price)}</h6>
                                    <h6>/person</h6>
                                    </div>
                                </div>
                                <div className="d-flex discountPrice">
                                    <h4>Discount price</h4>
                                    <div className="d-flex discount-prices">
                                    <h6>{formatPrice(Activity.price_discount)}</h6>
                                    <h6>/person</h6>
                                    </div>
                                </div>
                                <div className="paybtn">
                                    <button className="pay-btn disable">Pay Now</button>
                                </div>
                                <div classname="d-flex fasilitass">
                                    <p className='included'>Included</p>
                                    <p>{Activity.facilities}</p>
                                </div>
                        </div>
                    </div>
                            <div className='bodyActivityId'>
                                <h3>Description</h3>
                                <h5>{Activity.description}</h5>
                            </div>
                        <div className="locationn">
                            <div className="d-flex gap-4 col-md-8">
                            <i class="bi bi-geo-alt-fill"></i> 
                            <p>{Activity.address}</p>
                            </div>
                            <div className="locations" dangerouslySetInnerHTML={{ __html: Activity.location_maps }} />
                        </div>
                </Layout>
            )}
        </div>
    );
}
