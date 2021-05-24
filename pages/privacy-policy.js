import { API_URL } from "../config/index";
import RichText from "../components/RichText";
import Layout from "../components/Layout";
export default function Privacy({ data }) {
  return (
    <Layout title={data[0].title}>
      <div className="container mx-auto">
        <RichText doc={data[0].content} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const req = await fetch(`${API_URL}/privacies`);
  const res = await req.json();
  return {
    props: {
      data: res,
    },
  };
}
