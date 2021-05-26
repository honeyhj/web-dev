import  React ,{useState}from 'react';
import Footer from './Footer';
import Header from './Header';
import ProductDetailsPage from './ProductDetailsPage';
import ProductShow from './ProductShow';
import ShowCase from './ShowCase';
import TopHeading from './TopHeading';

const Home = ({ cartLength, addToCart, addToWishlist }) => {
    const [term, setTerm] = useState("");
    const [l, setL] = useState(0)
    const [h, setH] = useState(0)
    const setSearchTerm = (searchterm) => {
        setTerm(searchterm)
        // console.log(searchterm,'llllooolll')
    }
    const setProductByRange=(lower,higher)=>{
        setL(lower);
        setH(higher)
    }
    return (
        <>
            <Header cartLength={cartLength}></Header>
            <TopHeading></TopHeading>
            <ShowCase setSearchTerm={setSearchTerm} setProductByRange={setProductByRange}></ShowCase>
            <ProductShow term={term} lower={l} higher={h} addToCart={addToCart} addToWishlist={addToWishlist}></ProductShow>
            <Footer></Footer>
        </>
    );
};

export default Home;