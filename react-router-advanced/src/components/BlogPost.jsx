import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching blog post data
  useEffect(() => {
    // In a real app, you would fetch from an API
    const fetchData = () => {
      setTimeout(() => {
        const blogPosts = {
          '1': {
            title: 'Getting Started with React Router',
            author: 'Jane Smith',
            date: 'March 1, 2025',
            content: 'React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.'
          },
          '2': {
            title: 'Advanced Routing Techniques',
            author: 'Bob Johnson',
            date: 'March 5, 2025',
            content: 'Once you\'ve mastered the basics of React Router, you can move on to more advanced techniques like nested routes, protected routes, and dynamic routing. These features allow you to build more complex and secure applications.'
          }
        };

        if (blogPosts[id]) {
          setPost(blogPosts[id]);
          setLoading(false);
        } else {
          // Redirect to 404 if post doesn't exist
          navigate('/not-found', { replace: true });
        }
      }, 500); // Simulate network delay
    };

    fetchData();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <div className="meta">
        <span>By {post.author}</span>
        <span>Published on {post.date}</span>
      </div>
      <p>{post.content}</p>
      
      {/* Related posts based on the current post ID */}
      <div className="related-posts">
        <h3>Related Posts</h3>
        <ul>
          {id === '1' ? (
            <li><a href="/blog/2">Advanced Routing Techniques</a></li>
          ) : (
            <li><a href="/blog/1">Getting Started with React Router</a></li>
          )}
        </ul>
      </div>
      
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default BlogPost;