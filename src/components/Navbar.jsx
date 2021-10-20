import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography} from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {BankOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, FireOutlined} from '@ant-design/icons';


const Navbar = ({isSignedIn, darkTheme}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);
        
        handleResize();

        return () => window.removeEventListener('resize', handleResize)

    }, [])

    useEffect(() => {
        if(screenSize < 768){
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])


    return (
        <div className='nav-container'>
            <div className="logo-container">
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>Cryptid</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
                    {<MenuOutlined />}
                </Button>
            </div>
            {/* Menu needs dark theme */}
            {activeMenu && (
            <Menu className={`${darkTheme === true ? 'dark' : ''}`}>
                <Menu.Item id='dark-menu'  key='Home' icon={<BankOutlined />}>
                    <Link id='dark-menu' to='/'>Home</Link>
                </Menu.Item>
                <Menu.Item  id='dark-menu' key='cryptocurrencies' icon={<FundOutlined />}>
                    <Link id='dark-menu' to='/cryptocurrencies'>CryptoCurrencies</Link>
                </Menu.Item>
                <Menu.Item id='dark-menu' key='exchanges' icon={<MoneyCollectOutlined />}>
                    <Link id='dark-menu' to='/exchanges'>Exchanges</Link>
                </Menu.Item>
                <Menu.Item id='dark-menu' key='news' icon={<BulbOutlined />}>
                    <Link  id='dark-menu' to='/news'>News & Events</Link>
                </Menu.Item>
               {isSignedIn && <Menu.Item className={`${darkTheme === true ? 'dark' : ''}`} key='ticker' icon={<FireOutlined />}>
                   <Link className={`${darkTheme === true ? 'dark' : ''}`} to='/ticker'>Ticker</Link>
                </Menu.Item>}
            </Menu>
             )}   
        </div>
    )
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.user.isSignedIn, darkTheme: state.darkTheme.darkTheme}
}

export default connect(mapStateToProps)(Navbar)
