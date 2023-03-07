import { useState } from 'react';
import { useRouter } from 'next/router';
import { getHomeBySlug, updateHome } from '@lib/firebase';
import { useAuth } from '@contexts/auth';
import { Layout } from '@components';
import Link from 'next/dist/client/link';


const Edit = ({ post }) => {
  const router = useRouter();
  const [user, userLoading] = useAuth();
  const [values, setValues] = useState(post);
  const [isLoading, setIsLoading] = useState(false);

  if (userLoading) {
    return null;
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/signin');
    return null;
  }

  const handleChange = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;

    setValues({ ...values, [id]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let missingValues = [];
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key);
      }
    });

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`);
      return;
    }

    setIsLoading(true);
    updateHome(values)
      .then(() => {
        setIsLoading(false);
        router.push(`/usama/${post.slug}`);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div className=' bg-gray-400  flex flex-col justify-center h-screen items-center' >
        <form onSubmit={handleSubmit} className=" w-full flex  flex-col bg-green-300 p-2 rounded-xl font-serif text-red-400 mt-10 gap-5">
          <h1>Edit Post: {values.slug}</h1>
          <div className='flex flex-col'>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div className=' flex flex-col'>
            <h1 htmlFor="coverImage">Cover Image URL</h1>
            <input
              id="coverImage"
              type="text"
              value={values.coverImage}
              onChange={handleChange}
            />
          </div>
          <div className=' flex flex-col
          '>
            <label htmlFor="coverImageAlt">Cover Image Alt</label>
            <input
              id="coverImageAlt"
              type="text"
              value={values.coverImageAlt}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col'>
            <h1 htmlFor="content">Content</h1>
            <textarea className=' h-60'
              id="content"
              value={values.content}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-center'>
          <button className=' text-white rounded-sm px-1 bg-black align justify-self-center' type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
          </button>

          </div>
          <Link className=" text-white w-fit rounded-sm px-1 bg-black" href="/">cancel</Link>
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const post = await getHomeBySlug(context.query.slug);

  return {
    props: {
      post,
    },
  };
}

export default Edit;
