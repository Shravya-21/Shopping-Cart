import { Button } from 'semantic-ui-react'
import './Item.css'
import { CartItemType } from '../App'

type props = {
  item: CartItemType
  handleAddToCart: (clickedItem: CartItemType) => void
}

const Item: React.FC<props> = ({ item, handleAddToCart }) => {
  return (
    <div className='wrapper'>
      <img src={item.image} alt={item.image} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}> Add To Cart</Button>
    </div>
  )
}

export default Item
