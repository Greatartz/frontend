import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {API_URL} from '../../config/index'
import Link from 'next/link'

const Categories = ({posts}) => {

    const router = useRouter()
    const { slug } = router.query

    return (
        <Layout title={`${slug}`}>
            <section className="container my-10 mx-auto grid grid-cols-3 gap-10">
                  {posts.map((post) => (
                      <div className="text-center shadow border-b-2 border-borderColor">
                          <div className="w-full cursor-pointer">
                              <Link href={`/single/${post.slug}`}>
                                <img 
                                    className="catImage rounded-t"
                                    src={`${API_URL}${post.featured_image.url}`} />
                              </Link>
                          </div>
                          <div className="content">
                               <span className="text-subTitle block my-3">
                                    {slug}
                               </span>
                               <h2 className="text-title text-lg mb-2 py-3 catTitle inline-block">
                                   <Link href={`/single/${post.slug}`}>
                                        {post.title}
                                   </Link>
                               </h2>
                               <p className="text-subTitle mb-5 px-2 text-center">{post.excerpt}</p>
                               <a className="block mb-5 catMore py-2 inline-block">
                                    <Link href={`/single/${post.slug}`}>
                                        More
                                   </Link>
                               </a>
                          </div>
                      </div>
                  ))}  
            </section>
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