import Layout from '../../components/Layout'
import {API_URL} from '../../config/index'
import ArticleBox from '../../components/ArticleBox'
import Link from 'next/link'
import { useRouter } from 'next/router'
const PER_PAGE = 6

const TagPosts = ({ posts, total_length, page, tag_title }) => {

    const lastPage = Math.ceil(total_length / PER_PAGE)

    const router = useRouter()
    const { id } = router.query

    return (
        <Layout title={`Tag's Posts | ${tag_title}`}>

            <h1 className="text-center mt-10">
                <span className="border-2 border-borderColor p-1 rounded">{tag_title}</span>
            </h1>

            <section className="row mt-10">
                  {posts.map((post) => (
                      <ArticleBox post={post} key={post.id} />
                  )) }
            </section>

            <section className="w-11/12 mx-auto my-10 flex justify-between">
                {page > 1 && (
                    <Link href={`/tag/${id}?page=${page - 1}`}>
                        <a className='bg-borderColor text-white rounded py-2 px-5'>Prev</a>
                    </Link>
                )}

                {page < lastPage && (
                    <Link href={`/tag/${id}?page=${page + 1}`}>
                        <a className='bg-borderColor text-white rounded py-2 px-5'>Next</a>
                    </Link>
                )}
            </section>

        </Layout>
    );
}

export async function getServerSideProps({ params, query: { page = 1 } }) {

    const {id} = params
    const tagName = await fetch(`${API_URL}/tags?id=${id}`)
    const tag = await tagName.json()
    const tag_title = tag[0].title

    // Calculate start page
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

     // Fetch total/count
     const totalRes = await fetch(`${API_URL}/posts?tags=${id}`)
     const total = await totalRes.json()
     const total_length = total.length
    
    const res = await fetch(`${API_URL}/posts?tags=${id}&_limit=${PER_PAGE}&_start=${start}&_sort=id:DESC`)
    const posts = await res.json()

    return { props: { posts, page: +page, total_length, tag_title } }

}
 
export default TagPosts;