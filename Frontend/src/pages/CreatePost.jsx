import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CreatePost = () => {
  const [preview, setPreview] = useState(null); // selected image ka local preview URL
  const [status, setStatus] = useState(null);   // { type: "success" | "error", message: "" }
  const formRef = useRef(null);

  // Jab bhi preview change ho (ya component unmount ho), purana object URL
  // revoke kar do - warna browser memory mein wo blob hold hota rehta hai
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // agar pehle se koi preview thi to usko revoke karke naya banao
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/create-post`, formData);
      // success - message dikhao, form + preview reset karo
      setStatus({ type: "success", message: "Apki Photo mere pass aa gayi... 😁❤" });
      formRef.current.reset();
      setPreview(null);

      // 3 second baad message apne aap hata do
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      console.log(err);
      setStatus({ type: "error", message: "Something went wrong, try again." });
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <section className="create-post-section">
      <div className="create-post-card">
        <div className="create-post-header">
          <h2>Create Post</h2>
          <p>Share Your Secret Image with Me</p>
        </div>

        {/* Success / error banner - status null hone pe kuch render nahi hoga */}
        {status && (
          <div className={`status-banner ${status.type}`}>
            {status.type === "success" ? "✅" : "⚠️"} {status.message}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="image-upload">
            <label htmlFor="image">
              {preview ? (
                // agar preview hai to image dikhao + hover pe "change" overlay
                <div className="image-preview">
                  <img src={preview} alt="Selected preview" />
                  <div className="change-overlay">Ek baar fir soch lo..</div>
                </div>
              ) : (
                // koi image select nahi hui to default upload UI
                <>
                  <div className="upload-icon">📷</div>
                  <div>
                    <span className="upload-title">Choose an image</span>
                    <span className="upload-subtitle">
                      JPG, PNG, WEBP supported
                    </span>
                  </div>
                </>
              )}
            </label>

            <input
              id="image"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="caption-field">
            <label htmlFor="caption">Ek Memory</label>
            <textarea
              id="caption"
              name="caption"
              placeholder="Write something about your post..."
              rows="4"
              required
            />
          </div>

          <button type="submit">Add Post</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;