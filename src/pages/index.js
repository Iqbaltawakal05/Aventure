import Layout from "@/Components/Layout";
import Header from "@/Components/Header";
import Subheader from "@/Components/Vacations";
import Promo from "@/Components/_Promo";
import Banner from "@/Components/_Banner";

export default function Home() {
  return (
    <Layout>
      <Header />
      <Subheader />
      <Promo />
      <Banner />
    </Layout>
  )
}
