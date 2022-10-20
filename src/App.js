import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ModifyItems from './components/ModifyItems';
import AddItem from './components/AddItem';
import { useReducer,useState } from "react"
import Cart from './components/Cart';
import SortCategory from './components/SortCategory'
import styles from "./App.module.css"
import { Link } from 'react-router-dom';
import { Routes, Route } from "react-router";
import Menu from './components/Menu';
import ItemDetails from './components/ItemDetails';




function App() {
  const initialState = {
    forSaleItems: [
      {
        id: uuidv4(),
        name: "Borgir",
        price: 69,
        category: "Food",
        image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a tortor vitae lorem viverra hendrerit. Aliquam ligula ligula, pharetra vitae aliquet et, eleifend varius justo. In in dui nulla. In purus libero, ultricies a pretium quis, laoreet et dui. Donec vulputate, est euismod lobortis pulvinar, est neque tristique ex, ac rhoncus nunc augue eget nulla. Cras sed velit sed risus fringilla cursus sit amet a eros. Aliquam erat volutpat. Vivamus eget erat et massa fringilla ornare. Duis in velit quis purus pellentesque suscipit vitae nec lacus."
      },
      {
        id: uuidv4(),
        name: "Melkti",
        price: 69,
        category: "Drinks",
        image: "https://cdn-icons-png.flaticon.com/512/5821/5821159.png",
        desc: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin non diam diam. Sed nec lectus at elit bibendum tempor quis eget erat. Pellentesque risus turpis, scelerisque iaculis euismod gravida, malesuada ut est. Sed faucibus dapibus metus a luctus. Pellentesque in nunc dictum, elementum quam id, scelerisque risus. Nulla in suscipit est. Nullam at vehicula erat, sit amet laoreet nisi. Donec mattis nec nunc dignissim vulputate. Cras suscipit posuere libero quis molestie. Quisque est arcu, venenatis sed sapien a, semper porttitor magna. Vivamus elementum neque quis dolor posuere, eget venenatis nisl congue. Pellentesque malesuada volutpat nibh, id ultricies arcu faucibus quis. Donec in mauris accumsan, ornare diam sagittis, volutpat ante. Suspendisse auctor vitae lacus sit amet dignissim."
      },
      {
        id: uuidv4(),
        name: "Fries",
        price: 69,
        category: "Food",
        image: "https://cdn-icons-png.flaticon.com/512/590/590717.png",
        desc: "Donec id justo commodo, elementum felis nec, consectetur dolor. Aliquam lacinia mi eu turpis pulvinar, ac faucibus tortor ornare. Donec sed congue tortor. Donec accumsan est non lorem ornare, sit amet cursus quam porttitor. Mauris hendrerit sapien et massa pellentesque hendrerit. Vestibulum orci arcu, viverra nec nisl sed, cursus eleifend magna. Maecenas lobortis auctor ex, in volutpat eros pharetra quis. Sed ut neque eu risus consectetur imperdiet nec efficitur arcu. Suspendisse potenti. Suspendisse vitae enim gravida orci molestie commodo ac in libero."
      },
      {
        id: uuidv4(),
        name: "Coffee",
        price: 69,
        category: "Drinks",
        image: "https://cdn-icons-png.flaticon.com/512/590/590749.png",
        desc: "Etiam ornare, odio a tincidunt cursus, urna nisi posuere nisl, ac volutpat leo sem eget nibh. Nunc neque mauris, sollicitudin ac mollis vitae, molestie ut massa. Morbi vel pellentesque lacus, ut luctus ipsum. Sed quis tortor vitae arcu finibus consequat. Proin iaculis tortor a dolor sagittis lobortis quis sit amet mi. Etiam luctus dolor et sodales mattis. Aliquam eu suscipit enim. Integer nunc nunc, vestibulum porta dolor ornare, iaculis elementum leo. Praesent ac pellentesque mauris. In vestibulum vulputate ipsum sed efficitur. Vestibulum nulla diam, mollis nec ipsum eu, tempus pulvinar lectus. Quisque faucibus luctus nunc, vel ultricies magna tempus id. Nam libero lorem, aliquam eu quam cursus, hendrerit sollicitudin ante. In hac habitasse platea dictumst. Suspendisse ex sapien, hendrerit vitae viverra vitae, rutrum sit amet massa. Vestibulum vulputate magna condimentum tincidunt malesuada."
      },
      {
        id: uuidv4(),
        name: "Strawberry Cake",
        price: 69,
        category: "Dessert",
        image: "https://cdn-icons-png.flaticon.com/512/992/992717.png",
        desc: "Nullam posuere tristique tristique. Nulla tempus metus id sapien mattis rutrum. Nulla est mi, mattis eu fermentum at, aliquet in augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In vel neque quis risus vestibulum euismod. Vivamus lobortis aliquam sollicitudin. Vivamus convallis pellentesque efficitur. Nulla condimentum erat ac vestibulum pharetra. In hac habitasse platea dictumst. Integer nec massa tellus."
      }
    ],
    cartItems: [],
    categorySelected: "",
    toggle: true

  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        return { ...state, forSaleItems: [...state.forSaleItems, action.payload] }
      case "EDIT_ITEM":
        return {
          ...state, forSaleItems: state.forSaleItems.map(item => {
            if (item.id === action.payload.id) {
              item.name = action.payload.name;
              item.price = action.payload.price;
              item.category = action.payload.category
              item.image=action.payload.image
              item.desc=action.payload.desc
            }
            return item
          }),
          cartItems: state.cartItems.map(item => {
            if (item.id === action.payload.id) {
              item.name = action.payload.name;
              item.price = action.payload.price;
              item.category = action.payload.category
              item.image=action.payload.image
              item.desc=action.payload.desc
            }
            return item
          })
        };
      case "DELETE_ITEM":
        return {
          ...state,
          forSaleItems: state.forSaleItems.filter(item => item.id !== action.payload.id),
          cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
        };
      case "ADD_TO_CART":
        return {
          ...state, cartItems: action.payload
        }

      case "DELETE_CART_ITEM":
        return {
          ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
        }
      case "DECREMENT":
        return {
          ...state, cartItems: state.cartItems.map(
            item => {
              if (item.id === action.payload.id) {
                item.quantity = item.quantity - 1
              }
              return item
            }
          )
        }
      case "INCREMENT":
        return {
          ...state, cartItems: state.cartItems.map(
            item => {
              if (item.id === action.payload.id) {
                item.quantity = item.quantity + 1
              }
              return item
            }
          )
        }
      case "CATEGORY_SELECTION":
        return {
          ...state, categorySelected: action.payload.categorySelected
        }
      case "TOGGLE":
        return {
          ...state, toggle: action.payload.toggle
        }

      default: {
        return (alert("there is something wong"))
      }
    }
  }

  const handleAddToCartClick = (id, counter) => {
    const cartCopy = [...state.cartItems]

    let exists = false;

    cartCopy.forEach((item) => {
      if (id === item.id) {
        item.quantity = item.quantity + counter
        exists = true;
      }
    });

    if (exists === false) {
      let newItem = state.forSaleItems.filter(item => item.id === id)

      newItem = Object.assign({}, ...newItem)

      const item = {
        ...newItem, quantity: counter
      };

      cartCopy.push(item);
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: cartCopy
    })
    alert("added to cart successfully!")
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const categories = state.forSaleItems.reduce((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories
  }, [])

  let cartTotal = 0;
  const calculateTotal = () => {
    state.cartItems.forEach(item => { cartTotal += item.quantity * item.price })
    return cartTotal
  }
  calculateTotal()

  let filteredItems = state.categorySelected === "" || undefined ?
    state.forSaleItems :
    state.forSaleItems.filter(item => item.category === state.categorySelected);

  const displayModify = filteredItems.map(item => <ModifyItems key={item.id} item={item} dispatch={dispatch} handleAddToCartClick={handleAddToCartClick} />)
  const displayMenu = filteredItems.map(item => <Menu key={item.id} item={item} handleAddToCartClick={handleAddToCartClick} dispatch={dispatch} />)
  const displayCart = state.cartItems.map(item => <Cart item={item} key={item.id} dispatch={dispatch} cartTotal={cartTotal} />)

  const [toggle,setToggle] = useState(false)

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.header}> 
          {/* <img src={banner} alt="banner" className={styles.img}/> */}
          <strong>Resto App</strong>
        </div>
        <nav>
          <Link to="/" className={styles.tab1}>Menu</Link>
          <Link to="/cart" className={styles.tab2}>Cart</Link>
          <Link to="/modifyitems" className={styles.tab3}>Modify Items</Link>
        </nav>
        <div className={styles.main}>
          <Routes>
            (<Route path="/" element={state.forSaleItems.length === 0
              ? <div className={styles.menu}>"no item for sale"</div>
              :
              <>
                <div className={styles.category}>
                  <SortCategory categories={categories} dispatch={dispatch} />
                </div>
                <div className={styles.menu}>
                  {displayMenu}
                </div>
              </>

            }
            />)

            <Route path="/item/:id" element={<ItemDetails forSaleItems={state.forSaleItems} cartItems={state.cartItems} handleAddToCartClick={handleAddToCartClick} />} />

            <Route path="cart" element={state.cartItems.length === 0
              ? <div className={styles.cart}><strong>no items add to cart now</strong></div>
              :
              <>
                <div className={styles.cart}>
                  {displayCart}
                  <div className={styles.grandTotal}>
                    <b>Total :  </b>₱  {cartTotal}
                  </div>
                </div>

              </>}
            />

            <Route path="/modifyitems" element={
              
              <div className={styles.modifyItems}>
                {toggle? <AddItem dispatch={dispatch} forSaleItems={state.forSaleItems} setToggle={setToggle} /> : <button onClick={()=>setToggle(true)}>Add an Item</button>}
                <div className={styles.displayModify}>
                  {displayModify}
                </div>
              </div>
            }
            />
          </Routes>
        </div>


      </div>
    </div>
  );
}

export default App;
