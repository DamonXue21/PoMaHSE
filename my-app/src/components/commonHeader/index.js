import React from "react";
import {Layout, Menu} from 'antd'
import './index.css'
const {Header} = Layout



const CommonHeader = () => {
    const items = [
        {key: '1', label: 'General'}
    ]
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', height: '10vh', 
                background: `url(${process.env.PUBLIC_URL}/header.png)`
            }}>
                <div className="logo"
                    style={{ display: 'flex', alignItems: 'center'}}>
                    <img 
                    src = {`${process.env.PUBLIC_URL}/icon.png`} 
                    alt = 'logo' 
                    style={{
                            height: '8vh',  // 使用 style 对象
                            width: 'auto'
                        }}>
                    </img>
                    <span style={{ 
                        color: 'white', 
                        fontSize: '2.4vh', 
                        fontWeight: '700',
                        marginLeft: '5vh',
                        background: 'linear-gradient(45deg, #fff, #a8d8ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        High Score Event
                    </span>
                </div>
                <div style={{ marginLeft:'20vw', width: '20vw'}}>
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={items}
                        style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', fontSize: '2.4vh', fontWeight: '700'}}
                        className="custom-menu"
                    />
                </div>
                    
            </Header>
        </Layout>
    )
}

export default CommonHeader;