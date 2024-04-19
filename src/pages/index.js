import Layout from "@/Components/Layout";
import Header from "@/Components/Header";
import Promo from "@/Components/_Promo";
import Banner from "@/Components/_Banner";
import Category from "@/Components/_Category";
import Activity from "@/Components/_Activity";
import SectionHeader from "@/Components/sectionHeader";

export default function Home() {
  return (
    <Layout>
      <Header />
      <SectionHeader />
      <Category />
      <Promo />
      <Banner />
      <Activity />
    </Layout>
  )
}
