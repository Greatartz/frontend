import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {API_URL} from '../../config/index'
import ArticleBox from '../../components/ArticleBox'
import Link from 'next/link'
const PER_PAGE = 6

const Categories = ({posts, total_length, page }) => {

    const router = useRouter()
    const { slug } = router.query
    const lastPage = Math.ceil(total_length / PER_PAGE)
    return (
        <Layout title={` Category | ${slug}`}>
            { posts.length === 0 && <h1 className="text-5xl text-borderColor m-10">No Posts Found in {slug} Category! </h1> }
            
            {posts.length > 0 && <h1 className="text-center mt-10">
                <span className="border-2 border-borderColor p-1 rounded">{slug}</span>
            </h1>  }

            <section className="row mt-10">
                  {posts.map((post) => (
                      <ArticleBox post={post} />
                  )) }
            </section>

            <section className="container mx-auto my-10 flex space-between">
                {page > 1 && (
                    <Link href={`/category/${slug}?page=${page - 1}`}>
                        <a className='bg-borderColor text-white rounded py-2 px-5'>Prev</a>
                    </Link>
                )}

                {page < lastPage && (
                    <Link href={`/category/${slug}?page=${page + 1}`}>
                    <a className='bg-borderColor text-white rounded py-2 px-5'>Next</a>
                    </Link>
                )}
            </section>
        </Layout>
    );
}

export async function getServerSideProps({ params, query: { page = 1 } }) {

    const {slug} = params
    const request_category = await fetch(`${API_URL}/categories?name=${slug}`)
    const res_category = await request_category.json()
    const id = res_category[0].id

    // Calculate start page
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

    // Fetch total/count
    const totalRes = await fetch(`${API_URL}/posts?category=${id}`)
    const total = await totalRes.json()
    const total_length = total.length
    
    const res = await fetch(`${API_URL}/posts?category=${id}&_limit=${PER_PAGE}&_start=${start}&_sort=id:DESC`)
    const posts = await res.json()
    
    return { props: { posts, page: +page, total_length } }

}

export default Categories;
