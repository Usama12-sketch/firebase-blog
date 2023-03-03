// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

// // import styles from 'styles/index.module.css';
// import { getFormattedDate } from '@lib/utils';
import Link from 'next/link'
import { useAuth } from '@contexts/auth';

import { getPosts } from '@lib/firebase';
import { Layout } from '@components';

const getFormattedDate = (milliseconds) => {
  const formatOptions = {
    weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    };
    const date = new Date(milliseconds);
    return date.toLocaleDateString(undefined, formatOptions);
  };
  
  // This is for fetching data every time the page is visited. We do this
  // so that we don't have to redploy the site every time we add a blog post.
  // You can read more about this in the Next.js docs at:
  // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  
export async function getServerSideProps() {
    const posts = await getPosts();
    
    return {
      props: {
        posts,
      },
    };
  }
  
  export default function Blog  ({ posts }) {
    const [user] = useAuth();

   return (
      <div className=' w-full bg-slate-500'>
{/* <Layout/>     */}
      <h1 className=' hover:text-purple-300   to-pink-500 from-purple-400 bg-gradient-to-br text-2xl text-purple-500 font-serif font-bold text-center p-20 transition-all duration-500'>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.slug} className=" p-4 hover:shadow-lg shadow-2xl  m-4 bg-purple-400  transition-all duration-500 hover:bg-purple-500 text-white">
          <img src={post.coverImage} alt={post.coverImageAlt} />
          <div className='transition-all duration-500 font-serif'>
            <h2 className='text-black text-xl  shadow-lg'>{post.title}</h2>
            <span>{getFormattedDate(post.dateCreated)}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 200)}...`,
              }}
              ></p>

            <div className=' flex justify-between '>
             {user && (
               <span>
            <a className=' text-gray-800 p-1 shadow-black shadow-md hover:shadow-xl bg-green-400 rounded-sm transition-all duration-500'>
             <Link href={`/edit/${post.slug}`}>Edit</Link>
            </a>
          </span>
        )}
 <a className=' bg-slate-400 hover:shadow-md shadow-black text-black transition-all duration-300 underline rounded-lg hover:bg-white shadow-xl'>
  <Link href={`/post/${post.slug}`}>Continue Reading</Link>
 </a>
        </div>

          </div>
        </article>
      ))}
    </div>
  );
  
  
}