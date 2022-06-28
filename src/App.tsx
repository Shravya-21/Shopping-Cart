import { useState } from 'react'
import { useQuery } from 'react-query'
import { Loader, Container, Grid, Sidebar, Icon, Label } from 'semantic-ui-react'
import Item from './Item/Item'
import './App.css'

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json()

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  )

  console.log(data)

  const getTotalItems = (items: CartItemType[]) => {
    items.reduce((ack: number, item) => ack + item.amount, 0)
  }
  const handleAddToCart = (clickedItem: CartItemType) => null
  const handleRemoveFromCart = () => null

  if (isLoading) return <Loader active inline />
  if (error) return <div>Something went wrong...</div>

  return (
    <Container>
      <Sidebar
        direction='right'
        visible={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        Cart goes here
      </Sidebar>
      <Icon name='add to cart' size='big' onClick={() => setCartOpen(true)}>
        <Label
          color='red'
          circular
          floating
          size='mini'
          labelContent={() => {
            getTotalItems(cartItems)
          }}
        ></Label>
      </Icon>
      <Grid stackable columns={3}>
        {data?.map((item) => (
          <Grid.Column item key={item.id}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  )
}

export default App
