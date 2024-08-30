import React, { useState ,useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addToDB } from '../../utilities/localDB';
import '../../App.css';
import { FaAngleLeft, FaAngleRight, FaHeart } from 'react-icons/fa'
import ProdData from '../data/ProdData';
import '../TopProducts/TopProducts'
import Navbar from '../Navbar/Navbar';


const Product = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
    const { id } = useParams();
    const product = ProdData.find(product => product.id === id);

    

    const addToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDB(product.id);
        Swal.fire(
            'Successful!',
            `You Have Added ${product.name}!`,
            'success'
        );
    };
    
    const cart1 = (product) =>{
        setCart([...cart,product]);
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    const shoppingCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDB(id);
    }

    const handleClick = (product) => {
        shoppingCart(product);
        navigate('/shipping');
    }
    const toggleWishlist = (product) => {
        let newWishlist;
        if (wishlist.includes(product.id)) {
            newWishlist = wishlist.filter((id) => id !== product.id);
        } else {
            newWishlist = [...wishlist, product.id];
        }
        setWishlist(newWishlist);
    };

    const isWishlisted = (product) => wishlist.includes(product.id);

    return (
        <div> <Navbar />
        <section className=' py-4 bg-detail bg-cover bg-no-repeat bg-opacity-45 '>
            <div className="container mx-auto px-4">
                <h1 className='text-3xl font-bold text-center mb-8 underline'>Product Details</h1>

                <div className="flex flex-col lg:flex-row gap-4 bg-white bg-opacity-40">
                    <div className="lg:w-[400px] h-[400px] flex justify-center ">
                        <img
                            src={product.image}
                            className="rounded-lg shadow-lg w-full max-w-md"
                            alt={product.name}
                        />
                    </div>

                    <div className="lg:w-2/3 p-20 rounded-lg shadow-lg mt-[-60px] h-screen w-[100px]">
                        <h2 className='text-2xl font-semibold mb-8'>{product.name}</h2>
                        <p className='text-gray-700 mb-9'>{product.description}</p>
                        
                        <div className="flex gap-4">
                        <button
                                                onClick={() => addToCart(product)}
                                                className="bg-custom_gradient ml-[2px] custom-font-size py-2 px-1  hover:bg-white hover:border-2  hover:text-black "
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => toggleWishlist(product)}
                                                className={`text-xl py-1 px-1 rounded-full bg-transparent transition-colors  ${isWishlisted(product) ? 'text-red-500' : 'text-gray-400'
                                                    }`}
                                            >
                                                <FaHeart
                                                    className={`text-xl ${isWishlisted(product) ? 'text-red-500' : 'text-gray-400'
                                                        }`}
                                                />
                                            </button>
                                            <p className='text-lg font-bold mb-9 '>Price: {product.price} Taka</p>
                            
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </div>
    );
};

export default Product;
