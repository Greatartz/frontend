import { render } from 'storyblok-rich-text-react-renderer';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {API_URL} from '../../config/index'
import Link from 'next/link'

const SinglePage = ({ post }) => {

    const router = useRouter()
    const { slug } = router.query
    
    return (
        <Layout title={`Single | ${post[0].title}`}>
            <main className="container mx-auto py-10">
                
                <section className="singleHeader">
                    <h3 className="text-xl border-b-2 border-borderColor inline-block my-5 py-1">
                        <Link href={`/category/${post[0].category.name}`}>
                            {post[0].category.name} 
                        </Link>
                    </h3>
                    <h1 className="text-5xl">
                        {post[0].title}
                    </h1>
                    <p className="singleDate text-subTitle mt-5">
                        <span>
                            {new Date(post[0].updated_at).toLocaleDateString()}
                        </span> - 
                        <span> 
                            {post[0].author.firstname} {post[0].author.lastname}
                        </span>
                    </p>
                </section>

                <section className="singleContent">
                    <div className="singleFeatureImage">
                        <img src={`${API_URL}${post[0].featured_image.url}`} />
                    </div>
                    <div className="content">
                    {render(post[0].content)}
                    </div>
                </section>

            </main>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const {slug} = params
    const request_post = await fetch(`${API_URL}/posts?slug=${slug}`)
    const res_post = await request_post.json()
    return { props: { post: res_post } }
}

export default SinglePage;