import React from 'react';
import Header from './Header';
import ProductDetailsPage from './ProductDetailsPage';
import ProductShow from './ProductShow';
import ShowCase from './ShowCase';
import TopHeading from './TopHeading';

const Home = () => {
    return (
        <>
            <Header></Header>
            <TopHeading></TopHeading>
            <ShowCase></ShowCase>
            <ProductShow></ProductShow>
        </>
    );
};

export default Home;