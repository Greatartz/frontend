import MarkdownIt from 'markdown-it'
import parse from 'html-react-parser';
import TimeAgo from 'react-timeago'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import {API_URL} from '../../config/index'
import Link from 'next/link'



const SinglePage = ({ post }) => {
    const router = useRouter()
    const { slug } = router.query

    const md = new MarkdownIt()

    return (
        <Layout title={`Single | ${post[0].title}`}>
            <main className="container mx-auto py-10">
                
                <section className="singleHeader">
                    <h3 className="text-xl border-b-2 border-borderColor inline-block my-5 py-1">
                        <Link href={`/category/${post[0].category.name}`}>
                            {post[0].category.name} 
                        </Link>
                    </h3>
                    <h1 className="text-6xl">
                        <span className="border-b-2 border-white hover:border-borderColor">
                            {post[0].title}
                        </span>
                    </h1>
                    <p className="singleDate text-subTitle mt-5 text-xl">
                        <span>
                            {new Date(post[0].updated_at).toLocaleDateString()}
                        </span>

                            - 

                        <span> 
                            {post[0].author.firstname} {post[0].author.lastname}
                        </span>
                    </p>
                </section>

                <section className="singleContent grid grid-cols-4 gap-2">

                    <div className="col-span-3">
                        <div className="singleFeatureImage my-10">
                            <img src={`${API_URL}${post[0].featured_image.url}`} />
                        </div>
                        <div className="content">

                            <section className="tags mb-5">
                                {post[0].tags.map((tag) => (
                                    <span className="bg-borderColor p-2 rounded text-white mr-2">
                                        {tag.title}
                                    </span>
                                ))} 
                            </section>

                            <section id="content">
                                {parse(md.render(post[0].content))}
                            </section>
                            
                             <hr className="my-5" />           
                            <section className="location">
                                <p className="text-title font-bold">
                                    Location: <span>{post[0].location}</span>
                                </p>
                                <p className="text-title font-bold mt-2">
                                    Posted: <TimeAgo date={new Date(post[0].updated_at).toUTCString()} />
                                </p>
                                <p className="text-title font-bold mt-2">
                                    Author: <span> {post[0].author.firstname} {post[0].author.lastname} </span>
                                </p>      
                            </section>

                        </div>
                     </div> {/* / col */}

                     <div className="sidebar"></div>
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