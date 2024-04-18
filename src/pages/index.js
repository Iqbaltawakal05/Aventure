import Layout from "@/Components/Layout";
import Header from "@/Components/Header";
import Promo from "@/Components/_Promo";
import Banner from "@/Components/_Banner";
import Category from "@/Components/_Category";

export default function Home() {
  return (
    <Layout>
      <Header />
      <Category />
      <Promo />
      <Banner />
    </Layout>
  )
}
