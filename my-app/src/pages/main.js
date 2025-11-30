import React from "react";
import CommonHeader from '../components/commonHeader'
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const Home =() => {
    return (
        <div className="main"> 
            <Layout>
                <CommonHeader />
                <Outlet />
            </Layout>
            
        </div>
        
    )
}

export default Home;