import ProductItem from './ProductItem'
import classes from './Products.module.css'

const MOCK_DATA = [
  {
    id: 'p1',
    price: 10,
    title: 'A book',
    description: 'Some description of the book',
  },
  {
    id: 'p2',
    price: 17,
    title: 'The second book',
    description: 'Some description of the book',
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {MOCK_DATA.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
