import { getFormattedDate } from '@lib/utils';
import { getPostBySlug } from '@lib/firebase';
import { Layout } from '@components';
import Link from 'next/link';



const PostPage = ({ post }) => (<>
  {/* <Layout> </Layout> */}

      <div className=" p-4 hover:shadow-lg shadow-2xl  transition-all duration-500  bg-purple-400 hover:bg-purple-800 text-white h-screen ">
        <div className=' opacity-0 h-8'>546</div>
      <a className=' m-3 text-gray-800 p-1 shadow-black shadow-md hover:shadow-xl bg-green-400 rounded-sm transition-all duration-500'>
             <Link href={`/edit/${post.slug}`}>Edit</Link>
            </a>
        <img src={post.coverImage} alt={post.coverImageAlt} />
        <h1  className='text-black text-xl  shadow-lg'>{post.title}</h1>
        <span>Published {getFormattedDate(post.dateCreated)}</span>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
    
      </div>
    
  </>
  );
  

export async function getServerSideProps(context) {
    const post = await getPostBySlug(context.query.slug);
  
    return {
      props: {
        post,
      },
    };
  }
  
export default PostPage;
