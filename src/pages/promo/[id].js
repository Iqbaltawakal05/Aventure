import { fetchPromoById } from "@/API/PromoAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [promo, setPromo] = useState({});

    useEffect(() => {
        if (id) {
            fetchPromoById(id).then((data) => {
                setPromo(data);
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
        return 'Rp 0';
    }
    };

    return (
        <div>
            {promo && (
                <Layout>
                    <section className="container">
                        <div className="back-buttonid">
                            <div className="d-flex gap-3">
                                <a href="/promo"><i class="bi bi-chevron-left"></i></a>
                                <div>
                                    <a href="/promo">{promo.title}</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className='imageActivityId col-md-6'>
                            <img src={promo.imageUrl} alt={promo.title} />
                        </div>
                        <div className='col-md-5 m-5'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='bodyActivityId'>
                                    <h3>Promo Code </h3>
                                    <h5>{promo.promo_code}</h5>
                                    </div>
                                    <div className="bodyActivityId">
                                        <h3>Normal price</h3>
                                        <div className="d-flex original-prices">
                                            <h5>{formatPrice(promo.minimum_claim_price)}</h5>
                                            <h5>/person</h5>
                                        </div>
                                    </div>
                                    <div className="bodyActivityId">
                                        <h3>Discount price</h3>
                                        <div className="d-flex discount-prices">
                                            <h5>{formatPrice(promo.promo_discount_price)}</h5>
                                            <h5>/person</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='bodyActivityId'>
                                    <h3>Description</h3>
                                    <h5>{promo.description}</h5>
                                    <h3>terms & condition</h3>
                                    <h5>{promo.terms_condition}</h5>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>
                </Layout>
            )}
        </div>
    );
}
