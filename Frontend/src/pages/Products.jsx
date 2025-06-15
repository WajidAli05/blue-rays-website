import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '@/components/Loader';
import { Separator } from "@/components/ui/separator"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const { category } = useParams();

  const fetchProducts = () => {
    setLoading(true);
    setError(null); // Reset error state
    setProducts([]); // Reset products
    
    fetch(`http://localhost:3001/api/v1/product/category/${category}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // First check if response is ok
        if (!response.ok) {
          // For 404 or other errors, still parse JSON to get the message
          return response.json().then(errorData => {
            throw new Error(errorData.message || `HTTP ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Products fetched:', data);
        
        // Check if the response indicates success and has data
        if (data.status && data.data) {
          setProducts(data.data);
        } else {
          // Handle case where API returns success=false
          setProducts([]);
          setError(data.message || 'No products found');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {category ? category.replace(/%20/g, ' ').replace(/%26/g, '&') : 'Products'}
      </h2>
      <Separator className='mb-5' />

      {loading ? (
        <Loader size="lg" message="Loading products..." />
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={fetchProducts}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
            >
              Back
            </button>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default Products;