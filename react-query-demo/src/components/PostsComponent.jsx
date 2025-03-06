import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';

// API functions
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const createPost = async (newPost) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  
  return response.json();
};

const PostsComponent = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  // Use React Query's useQuery hook to fetch posts
  const { 
    data: posts, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching 
  } = useQuery('posts', fetchPosts, {
    staleTime: 60000, // Consider data fresh for 1 minute
    cacheTime: 300000, // Keep data in cache for 5 minutes
    refetchOnWindowFocus: false, // Disable automatic refetching when window gains focus
  });
  
  // Use useMutation for post creation
  const createPostMutation = useMutation(createPost, {
    onSuccess: (newPost) => {
      // Optimistically update the cache
      queryClient.setQueryData('posts', oldPosts => [newPost, ...oldPosts]);
      
      // Reset form fields
      setTitle('');
      setBody('');
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) return;
    
    createPostMutation.mutate({
      title,
      body,
      userId: 1, // Placeholder user ID
    });
  };
  
  if (isLoading) return <div className="loading">Loading posts...</div>;
  
  if (isError) return <div className="error">Error: {error.message}</div>;
  
  return (
    <div className="posts-container">
      <h1>Posts</h1>
      
      <div className="controls">
        <button 
          onClick={() => refetch()} 
          disabled={isFetching} 
          className="refetch-button"
        >
          {isFetching ? 'Refreshing...' : 'Refresh Posts'}
        </button>
        <div className="cache-info">
          {isFetching ? 'Fetching from API...' : 'Data from cache'}
        </div>
      </div>
      
      <div className="post-form-container">
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={createPostMutation.isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="body">Content:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={createPostMutation.isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={createPostMutation.isLoading}
            className="submit-button"
          >
            {createPostMutation.isLoading ? 'Adding...' : 'Add Post'}
          </button>
          
          {createPostMutation.isError && (
            <div className="error">Error adding post: {createPostMutation.error.message}</div>
          )}
          {createPostMutation.isSuccess && (
            <div className="success">Post added successfully!</div>
          )}
        </form>
      </div>
      
      <div className="posts-list">
        {posts && posts.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsComponent;