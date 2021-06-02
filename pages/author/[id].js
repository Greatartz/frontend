import Layout from '../../components/Layout'
import {API_URL} from '../../config/index'
import ArticleBox from '../../components/ArticleBox'
import Link from 'next/link'
import { useRouter } from 'next/router'
const PER_PAGE = 6
import { NextSeo } from 'next-seo';

const AuthorPosts = ({ posts, total_length, page }) => {

    const lastPage = Math.ceil(total_length / PER_PAGE)

    const router = useRouter()
    const { id } = router.query
	
	const SEO = {
		title: `Author | ${posts[0].author.firstname}  ${posts[0].author.lastname}`,
		description: 'MITCH CUMM list of author posts'
	}

    return (
        <Layout>
			 <NextSeo {...SEO} />	
            <h1 className="text-center mt-10">
                <span className="border-2 border-borderColor p-1 rounded">{posts[0].author.firstname}  {posts[0].author.lastname}</span>
            </h1>

            <section className="row mt-10">
                  {posts.map((post) => (
                      <ArticleBox post={post} />
                  )) }
            </section>

            <section className="w-11/12 mx-auto my-10 flex justify-between">
                {page > 1 && (
                    <Link href={`/author/${id}?page=${page - 1}`}>
                        <a className='bg-borderColor text-white rounded py-2 px-5'>Prev</a>
                    </Link>
                )}

                {page < lastPage && (
                    <Link href={`/author/${id}?page=${page + 1}`}>
                        <a className='bg-borderColor text-white rounded py-2 px-5'>Next</a>
                    </Link>
                )}
            </section>
           
        </Layout>
    );
}

export async function getServerSideProps({ params, query: { page = 1 } }) {

    const {id} = params

    // Calculate start page
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

     // Fetch total/count
     const totalRes = await fetch(`${API_URL}/posts?author=${id}`)
     const total = await totalRes.json()
     const total_length = total.length

    const res = await fetch(`${API_URL}/posts?author=${id}&_limit=${PER_PAGE}&_start=${start}&_sort=id:DESC`)
    const posts = await res.json()

    return { props: { posts, page: +page, total_length } }

}
 
export default AuthorPosts;