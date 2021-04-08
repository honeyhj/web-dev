import React from 'react';
import Header from './Header';
import ProductDetailsPage from './ProductDetailsPage';
import ProductShow from './ProductShow';
import ShowCase from './ShowCase';
import TopHeading from './TopHeading';

const Home = ({cartLength,addToCart}) => {
    return (
        <>
            <Header cartLength={cartLength}></Header>
            <TopHeading></TopHeading>
            <ShowCase></ShowCase>
            <ProductShow addToCart={addToCart}></ProductShow>
        </>
    );
};

export default Home;