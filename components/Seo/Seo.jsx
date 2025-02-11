
import Head from "next/head";

export default function Seo({ title }) {
  // Setting default title & desc
  const pageTitle = title ? title : "Mohit brothers - Readymade Ecommerce Script";

  const pageDesc =
    "Mohit Brothers is a NextJs Based Seo Optimized Readymade eCommerce Script With Advanced Features Built For Small Business Owners And Entrepreneurs";

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
    </Head>
  );
}
