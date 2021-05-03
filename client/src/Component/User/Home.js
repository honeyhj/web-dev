import  React ,{useState}from 'react';
import Header from './Header';
import ProductDetailsPage from './ProductDetailsPage';
import ProductShow from './ProductShow';
import ShowCase from './ShowCase';
import TopHeading from './TopHeading';

const Home = ({ cartLength, addToCart, addToWishlist }) => {
    const [term, setTerm] = useState("");
    const setSearchTerm = (searchterm) => {
        setTerm(searchterm)
        // console.log(searchterm,'llllooolll')
    }
    return (
        <>
            <Header cartLength={cartLength}></Header>
            <TopHeading></TopHeading>
            <ShowCase setSearchTerm={setSearchTerm}></ShowCase>
            <ProductShow term={term} addToCart={addToCart} addToWishlist={addToWishlist}></ProductShow>
        </>
    );
};

export default Home;