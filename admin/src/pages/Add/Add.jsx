import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Add.css";
import axios from "axios";

const Add = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [productData, setProductData] = useState({
    image: null,
    name: "",
    description: "",
    category: "",
    price: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setProductData({
        ...productData,
        image: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      toast.success('Image uploaded successfully');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!productData.image) {
      toast.error('Please upload an image');
      setIsSubmitting(false);
      return;
    }
    
    if (!productData.name.trim()) {
      toast.error('Please enter a product name');
      setIsSubmitting(false);
      return;
    }
    
    if (!productData.description.trim()) {
      toast.error('Please enter a product description');
      setIsSubmitting(false);
      return;
    }
    
    if (!productData.category) {
      toast.error('Please select a category');
      setIsSubmitting(false);
      return;
    }
    
    if (!productData.price || parseFloat(productData.price) <= 0) {
      toast.error('Please enter a valid price');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('image', productData.image);
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('price', productData.price);
      
      // Send data to backend
      const response = await axios.post(`${backendURL}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.status >= 200 && response.status < 300) {
        toast.success('Product added successfully!');
        
        // Reset form
        setProductData({
          image: null,
          name: "",
          description: "",
          category: "",
          price: ""
        });
        setImagePreview(null);
      } else {
        if (response.data && response.data.success === false) {
          toast.error(response.data.message || 'Failed to add product');
        } else {
          toast.error('Failed to add product. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
      
      // Handle specific error cases
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.response.status === 413) {
          toast.error('File too large. Please upload a smaller image.');
        } else if (error.response.status >= 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('Failed to add product. Please try again.');
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="image-preview"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            )}
          </label>
          <input 
            type="file" 
            id="image" 
            name="image"
            hidden  
            onChange={handleImageUpload}
            accept="image/*"
            disabled={isSubmitting}
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input 
            type="text" 
            name="name" 
            placeholder="Type here" 
            value={productData.name}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea 
            name="description" 
            rows="6" 
            placeholder="Write content here" 
            value={productData.description}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select 
              name="category" 
              value={productData.category}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            >
              <option value="" disabled>Select category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Desserts">Desserts</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Price</p>
            <input 
              type="number" 
              name="price" 
              placeholder="$20" 
              value={productData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div className="add-submit">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? "ADDING..." : "ADD PRODUCT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;