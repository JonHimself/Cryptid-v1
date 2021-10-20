import React, { useState, useEffect } from 'react';
import millify from 'millify';
import Loader from '../components/Loader'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, Row, Col, Input} from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({darkTheme, simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])

    if(isFetching) return <Loader />
    
    return (
        <>
        {!simplified && (
            <div className='search-crypto'>
                <Input className={darkTheme ? 'darkInput' : ''} placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
        )}
        <Row gutter={[32, 32]} className='crypto-card-container'>
            {cryptos?.map((currency) => {
                return(
                <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                    <Link to={`/crypto/${currency.id}`}>
                        <Card bodyStyle={darkTheme === true ? {backgroundColor:'rgb(31, 31, 31)', color: 'white'} : {color: 'black'}} className='card-head' title={`${currency.rank}. ${currency.name}`} extra={<img alt='coinimage' className='crypto-image' src={currency.iconUrl}></img>}
                        hoverable>
                            <p>Price: ${millify(currency.price)} USD</p>
                            <p>Market Cap: {millify(currency.marketCap)}</p>
                            <p style={currency.change < 0 ? {color: 'red'}  : {color: '#00D100'}}>Daily Change: {millify(currency.change)}%  {currency.change < 0 ? <ArrowDownOutlined style={{color: 'red'}}/>  : <ArrowUpOutlined style={{color: '#00D100'}}/>}</p>
                        </Card>
                    </Link>
                </Col>)
                })}
        </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return { darkTheme: state.darkTheme.darkTheme}
}

export default connect(mapStateToProps)(Cryptocurrencies)
