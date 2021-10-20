import React from 'react';
import millify from 'millify';
import { connect } from 'react-redux'
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = ({darkTheme}) => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;
 

  return (
    <>
      <Row>
        <Col span={6}>Exchange Rank</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange, i) => (
          <Col span={24}>
            <Collapse bordered={false}>
              <Panel  
                className={darkTheme === true ? 'darkColl' : ''}
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row  className={darkTheme === true ? 'darkColl' : ''} key={exchange.id}>
                    <Col span={6}>
                      <Text style={darkTheme ? {color: 'white'} : {color: 'black'}}><strong>{i + 1}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text style={darkTheme ? {color: 'white'} : {color: 'black'}}><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                <div className={darkTheme === true ? 'darkColl' : ''}>
                {HTMLReactParser(exchange.description || '')}
                </div>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  return {darkTheme: state.darkTheme.darkTheme}
}

export default connect(mapStateToProps)(Exchanges);
