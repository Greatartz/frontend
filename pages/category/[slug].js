import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {API_URL} from '../../config/index'
import Link from 'next/link'
import ArticleBox from '../../components/ArticleBox'
const Categories = ({posts}) => {

    const router = useRouter()
    const { slug } = router.query

    return (
        <Layout title={`${slug}`}>
            {posts.length > 0 ? <section className="container my-10 mx-auto grid grid-cols-3 gap-10">
                  {posts.map((post) => (
                      <ArticleBox post={post} />
                  )) }
            </section> : <h1 className="text-5xl text-borderColor m-10">No Posts Found in {slug} Category! </h1> }
            
        </Layout>
    );
}


export async function getStaticPaths() {
    
    const res = await fetch(`${API_URL}/categories`)
    const categories = await res.json()

    const paths = categories.map((category) => ({
        params: { slug: category.name },
    }))
    

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const {slug} = params
    const request_category = await fetch(`${API_URL}/categories?name=${slug}`)
    const res_category = await request_category.json()
    const id = res_category[0].id
    
    const res = await fetch(`${API_URL}/posts?category=${id}&_limit=6`)
    const posts = await res.json()
    
    return { props: { posts } }
}

export default Categories;