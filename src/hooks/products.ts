import { useEffect, useState } from "react"
import { IProduct } from "../models"
import axios, {AxiosError} from 'axios'

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function addProduct(product: IProduct){
      setProducts(prev => [...prev, product])
    }
  
  
    async function fetchProducts() {
      try {
        setError('')
        setLoading(true)
        const res = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5')
        setProducts(res.data)
        setLoading(false)
      } catch (error: unknown) {
        const err = error as AxiosError
        setLoading(false)
        setError(err.message)
      }
      
    }
    useEffect(() => {
      fetchProducts()
    }, [])

    return { products, error, loading, addProduct }
}