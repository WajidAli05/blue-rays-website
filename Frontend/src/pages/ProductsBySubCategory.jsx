import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'

const ProductsBySubCategory = () => {
  const { subcategory } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = () => {
    setLoading(true)
    fetch(`http://localhost:3001/api/v1/product/sub-category/${subcategory.toLowerCase()}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setProducts(data.data || [])
          setError(null)
        } else {
          throw new Error(data.message || "Unknown error")
        }
      })
      .catch(err => {
        console.error("Fetch error:", err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [subcategory])

  if (loading) {
    return (
      <div>
        <div className="w-full border-b shadow-sm z-40 bg-white dark:bg-gray-900">
          <div className="max-w-screen-2xl mx-auto px-6 py-4 text-sm text-muted-foreground">
            Loading products...
          </div>
        </div>
        <div className="flex flex-wrap gap-4 p-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-[250px] h-[350px] rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
    <div className="w-full border-b shadow-sm z-40 bg-white dark:bg-gray-900">
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="border border-red-500 bg-red-100 text-red-700 rounded-md px-4 py-3 text-sm font-medium">
          {error}
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 justify-start">
        {products.map(prod => (
          <ProductCard key={prod._id} product={prod} />
        ))}
      </div>
    </div>
  )
}

export default ProductsBySubCategory