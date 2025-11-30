import { Layout, Card, Select, Space} from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
const { Option } = Select;

const Home =() => {
    const [pokemonData, setPokemonData] = useState([]);
    const [pairsList, setPairsList] = useState([]);
    const [curPairsList, setCurPairsList] = useState([])

    const [eventList, setEventList] = useState([])
    const [selectedOptionOne, setSelectedOptionOne] = useState('');
    const [selectedOptionTwo, setSelectedOptionTwo] = useState('');

    const [currentType, setcurrentType] = useState([])

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/data/sync_pairs.json`);
                const data = await response.json();
                setPokemonData(data);
                setPairsList(data)
                setCurPairsList(data)
            } catch (error) {
                console.error('读取拍组失败:', error);
            }
        };

        const fetchEventData = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/data/events.json`);
                const data = await response.json()
                setEventList(data)
            } catch (error) {
                console.error('读取活动失败:', error)
            }
        }

        fetchPokemonData();
        fetchEventData();
    }, []);
    
    // console.log(pokemonData)
    
    useEffect(() => {
        console.log(pairsList)
        setCurPairsList(pairsList.filter(item => (item[selectedOptionOne] === true || selectedOptionOne === '') 
            && (item['Label'].some(i => i === selectedOptionTwo) || selectedOptionTwo === '')))
    }, [selectedOptionOne, selectedOptionTwo])

    const EventClick = (id) => {
        setcurrentType(eventList.find(item => item.id === id).Type)
    }

    useEffect(() => {
        setSelectedOptionOne('')
        setSelectedOptionTwo('')
        
        let Type1 = currentType[0]
        let Type2 = currentType[1]
        console.log(Type1 + " " + Type2)
        const filterList = pokemonData.filter(item => (item.Type === Type1 || item.Type === Type2))
        setPairsList(filterList)
        setCurPairsList(filterList)
        console.log(curPairsList)
    }, [currentType])
    
    return (
        <Layout>
            <Content className="homepage" 
                style={{ 
                    background: `url(${process.env.PUBLIC_URL}/background.png) repeat`,
                    backgroundSize: 'auto', 
                    backgroundPosition: 'center',
                    height: '90vh',
                    width: '100vw',
                    margin: '0px',
                    position: 'relative'
                }}
            > 
                <Space direction="vertical" size={4} style={{ 
                    position: 'absolute',
                    left: '5%',
                    zIndex: 10
                }}>
                    <Select
                        value={selectedOptionOne}
                        onChange={setSelectedOptionOne}
                        placeholder="选择 A, B 或 C"
                        style={{ width: '10vw', marginTop: '8%', left: "5%"}}
                        >
                        <Option value="">All</Option> 
                        <Option value="Confusion">Confusion</Option>
                        <Option value="Trap">Trap</Option>
                        <Option value="Flitch">Flitch</Option>
                        <Option value="Poison">Poison</Option>
                        <Option value="Burn">Burn</Option>
                        <Option value="Sleep">Sleep</Option>
                        <Option value="Paralysis">Paralysis</Option>
                        <Option value="Freeze">Freeze</Option>
                    </Select>
                    <Select
                        value={selectedOptionTwo}
                        onChange={setSelectedOptionTwo}
                        placeholder="选择 A, B 或 C"
                        style={{ width: '10vw', marginTop: '8%', left: "5%"}}
                        >
                        <Option value="">All</Option> 
                        <Option value="Main Character">Main Character</Option>
                        <Option value="Rival">Rival</Option>
                        <Option value="Champion">Champion</Option>
                        <Option value="Gym Leader">Gym Leader</Option>
                    </Select>
                </Space>
                
                <ul className="event-list"
                    style={{
                        marginTop: "7%",
                        width: '20%',
                        height: '80%',
                        overflowY: 'auto',           
                        overflowX: 'hidden',         
                        scrollbarWidth: 'thin',      
                        scrollbarColor: '#c0c0c0 transparent', 

                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    {
                        eventList.map(item => {
                            return (
                                <li style={{
                                    overflow: "hidden",
                                    cursor: 'pointer'
                                    }}
                                    onClick={() => EventClick(item.id)}                                   
                                >
                                    <img src={`${process.env.PUBLIC_URL}${item.Icon}`} alt="eventIcon"
                                        style = {{
                                            width: '100%',
                                            height: 'auto',
                                            objectFit: 'cover',
                                            display: 'block',
                                            margin: '5px'
                                        }}
                                    ></img>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="container-box"
                    style = {{
                        width: '75%',
                        height: '90%',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(58, 169, 255, 0.3)',
                        position: 'absolute',
                        right: '2vw',
                        bottom: '1vh',
                        borderRadius: '30px'
                    }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(8, 1fr)',  // 8列
                        gridTemplateRows: 'repeat(5, 100px)',   // 5行，每行100px
                        gap: '1vw',
                        padding: '2%'
                    }}>
                        {
                            curPairsList.map(item => {
                                return ( 
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxSizing: 'border-box'
                                    }}
                                    
                                    >
                                        <img src={`${process.env.PUBLIC_URL}${item.Icon}`} alt='icon' style={{
                                            width: '120%',    
                                            height: '120%',
                                            objectFit: 'contain', 
                                        }}></img>
                                </div>)
                            })
                        }
                    </div>
                </div>
                
                
                
            </Content>
        </Layout>
        
        
    )
}

export default Home;