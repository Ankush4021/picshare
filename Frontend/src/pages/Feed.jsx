import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
      });
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== id)
      );

    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  return (
    <section className="feed-section">
      <div className="feed-container">

        <div className="feed-header">
          <h1>Feed</h1>
          <p>Humari Yaadein...</p>
        </div>

        {posts.length > 0 ? (
          <div className="posts-wrapper">

            {posts.map((post) => (
              <article key={post._id} className="post-card">

                <div className="post-image-wrapper">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="post-image"
                  />
                </div>

                <div className="post-content">
                  <p>{post.caption}</p>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post._id)}
                  >
                    <span>🗑</span>
                    Delete Yaad.🥺
                  </button>
                </div>

              </article>
            ))}

          </div>
        ) : (
          <div className="empty-feed">
            <div className="empty-icon">📭</div>
            <h2>No Posts Available</h2>
            <p>There are no posts to show right now.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Feed;