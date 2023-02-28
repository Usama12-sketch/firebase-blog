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
  
  export default function HomePage  ({ posts }) {
    const [user] = useAuth();

   return (
      <div >
<Layout/>    
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.slug}>
          <img src={post.coverImage} alt={post.coverImageAlt} />
          <div>
            <h2>{post.title}</h2>
            <span>{getFormattedDate(post.dateCreated)}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 200)}...`,
              }}
              ></p>
             {user && (
               <span>
        
            <a className=' bg-green-400'>
             <Link href={`/edit/${post.slug}`}>Edit</Link>
            </a>

          </span>
        )}

<Link href={`/post/${post.slug}`}>Continue Reading</Link>

          </div>
        </article>
      ))}
    </div>
  );
  
  
}