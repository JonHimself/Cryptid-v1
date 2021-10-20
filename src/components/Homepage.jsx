import React, { useEffect } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '../components'
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoApi'
const { Title } = Typography


const Homepage = ({darkTheme}) => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats
    
    if(isFetching) return <Loader />

    return (
        <>
        <Title level={2} className={`heading ${darkTheme === true ? 'dark' : ''}`}>Global Crypto Stats</Title>
        <Row>
            <Col span={12}>
                <div id='dark'>Total Cryptocurrencies</div>
                <div id='dark-number'>{globalStats.total.toLocaleString()}</div>
                {/* <Statistic title='Total Cryptocurrencies' value={globalStats.total}/> */}
            </Col>
            <Col span={12}>
                <div id='dark'>Total Exchanges</div>
                <div id='dark-number'>{millify(globalStats.totalExchanges)}</div>
                {/* <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}/> */}
            </Col>
            <Col span={12}>
                <div id='dark'>Total Market Cap</div>
                <div id='dark-number'>{millify(globalStats.totalMarketCap)}</div>
                {/* <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)}/> */}
            </Col>
            <Col span={12}>
                <div id='dark'>Total 24hr Volume</div>
                <div id='dark-number'>{millify(globalStats.total24hVolume)}</div>
                {/* <Statistic title='Total 24hr Volume' value={millify(globalStats.total24hVolume)}/> */}
            </Col>
            <Col span={12}>
                <div id='dark'>Total Markets</div>
                <div id='dark-number'>{millify(globalStats.totalMarkets)}</div>
                {/* <Statistic title='Total Markets' value={millify(globalStats.totalMarkets)}/> */}
            </Col>
        </Row>
        <div className='home-heading-container'>
            <Title level={2} className={`home-title ${darkTheme === true ? 'dark' : ''}`}>Top 10 CryptoCurrencies in the World</Title>
            <Title level={3} className='show-more'>
                <Link to='/cryptocurrencies'>More</Link>
            </Title>
        </div>
        <Cryptocurrencies simplified/>  
        <div className="home-heading-container">
            <Title level={2} className={`home-title ${darkTheme === true ? 'dark' : ''}`}>Latest Crypto News</Title>
            <Title level={3} className='show-more'>
                <Link to='/news'>More</Link>
            </Title>
        </div>
        <News simplified />
        </>
    )
}

const mapStateToProps = (state) => {
    return {darkTheme: state.darkTheme.darkTheme}
}

export default connect(mapStateToProps)(Homepage)
