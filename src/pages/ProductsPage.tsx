import { useContext } from 'react';
import CreateProduct from '../components/CreateProduct';
import Error from '../components/Error';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import Product from '../components/Product';
import { ModalContext } from '../context/ModalText';
import { useProducts } from '../hooks/products';
import { IProduct } from '../models';

const ProductsPage = () => {
    const {loading, products, error, addProduct} = useProducts()
  const {modal, open, close} = useContext(ModalContext)
  const createHandler = (product: IProduct) => {
    close()
    addProduct(product)
  }
  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <Error error={error} />}
      {products.map(product => <Product key={product.id} product={product} />)}
      {modal && <Modal title='Create new product' onClose={close}>
        <CreateProduct onCreate={createHandler} />
      </Modal>}
      <button className="fixed bottom-5 right-5 rounded-full bg-red-500 text-white text-2xl px-4 py-2"
      onClick={open}
      >+</button>
    </div>
  );
};

export default ProductsPage;