// This component represents the index page for the site. You
// can read more about Pages in the Next.js docs at:
// https://nextjs.org/docs/basic-features/pages

// // import styles from 'styles/index.module.css';
// import { getFormattedDate } from '@lib/utils';
import Link from 'next/link'
import { useAuth } from '@contexts/auth';

import { getPosts } from '@lib/firebase';
import { Layout } from '@components';
import Image from 'next/image';
import Main from 'components/main/feature';

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
  
  export default function HomePage  ({ posts }) {
    const [user] = useAuth();

   return (

    <>
 
               <Main
             banner_Logo="/feature.png"
             />
             <br />
             
      <div className=' w-full  bg-slate-500'>
{/* <Layout/>     */}
      <h1 className=' hover:text-white to-gray-600 from-gray-200 bg-gradient-to-br text-2xl text-black font-serif font-bold text-center p-20 transition-all duration-500'>Blog Posts</h1>
      <div className='relative flex overflow-scroll'>

      {posts.map((post) => (
        <article key={post.slug} className=" p-4 hover:shadow-lg shadow-2xl  m-4 bg-blue-400 rounded-xl  transition-all duration-500 hover:bg-purple-500 text-white">
          <img src={post.coverImage} alt={post.coverImageAlt} />
          <div className='transition-all duration-500 font-serif'>
            
        

            <div className=' flex justify-between '>
            
 <a className=' px-2 bg-slate-400 hover:shadow-md shadow-black text-black transition-all duration-300 underline rounded-lg hover:bg-white shadow-xl'>
  <Link href={`/post/${post.slug}`}>{post.title}</Link>
 </a>
        </div>

          </div>
        </article>
      ))}
      </div>
    </div>
    </>
  );
  
  
}