import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {API_URL} from '../../config/index'
import ArticleBox from '../../components/ArticleBox'

const AuthorPosts = ({ posts }) => {

    const router = useRouter()
    const { slug } = router.query

    return (
        <Layout title={`Author Posts`}>
            {posts.length > 0 ? <section className="row">
                  {posts.map((post) => (
                      <ArticleBox post={post} />
                  )) }
            </section> : <h1 className="text-5xl text-borderColor m-10">No Posts Found From {slug} User! </h1> }
        </Layout>
    );
}

export async function getServerSideProps({ params }) {

    const {id} = params

    const res = await fetch(`${API_URL}/posts?author=${id}&_limit=6&_sort=id:DESC`)
    const posts = await res.json()

    return { props: { posts } }

}
 
export default AuthorPosts;