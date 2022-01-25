import './Main.scss';
import Filter from "./Filter";
import Modal from './Modal';
import Resume from './Resume';
import Table from './Table';
import { useEffect, useState } from 'react';


export default function Main(){
    const [modal, setModal] = useState(false);
    const [tableValues, setTableValues] = useState([]);
    const [tableValues2, setTableValues2] = useState([]);
    const [count, setCount] = useState(false);
    const [title, setTitle] = useState('');
    const [money, setMoney] = useState('');
    const [cat, setCat] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const [inOrOut, setInOrOut] = useState(1);
    const [id, setID] = useState(0);
    const[typeTransaction, setTypeTransaction] = useState('');
    const[upObj, setPutObj] = useState({});
    const [valueMax, setValueMax] = useState(0);   
    const [valueMin, setValueMin] = useState(0); 

    function handleEdit(e) {
        setID(e.target.id);
        setModal(true);
        setTitle('Editar registro');
        const a = tableValues.filter(function (t) {
            return t.id == e.target.id;
        })
        setPutObj(a[0])
        setMoney(a[0].value);
        setDate(a[0].date);
        setCat(a[0].category);
        setDesc(a[0].description);        
    }
    function handleFilters() {
        if(!valueMax) return;
        if(!valueMin) return;
        
        const novoArray = tableValues.filter(t => t.value <= valueMax && t.value >= valueMin)
        setTableValues2(novoArray)
    }
    function hanldeClearfilters() {
        setTableValues2(tableValues)
        setValueMax(0);
        setValueMin(0);
    }
    async function fetchData() {
        const response = await fetch('http://localhost:3333/transactions',{
            method: "GET",
            headers:{
                'content-type': 'application/json'
            }
        });
        const data = await response.json();
        setTableValues(data);
        setTableValues2(data);
    }
    useEffect(_=>{
    fetchData();    
    }, [])
    return(
        <div className="dashboard">
            <div className="main-section">
                <div className="sub-section">
                    <Filter 
                    hanldeClearfilters={hanldeClearfilters}
                    valueMax={valueMax}
                    valueMin={valueMin}
                    setValueMax={setValueMax}
                    setValueMin={setValueMin}
                    handleFilters={handleFilters}
                    fetchData={fetchData}
                    count={count}
                    setCount={setCount}
                    setTableValues={setTableValues}
                    tableValues={tableValues}
                    />
                    <Table 
                    fetchData={fetchData}
                    typeTransaction={typeTransaction}
                    setTypeTransaction={setTypeTransaction}
                    id={id}
                    setID={setID}
                    handleEdit={handleEdit} 
                    tableValues={tableValues} 
                    tableValues2={tableValues2} 
                    setTableValues={setTableValues} 
                    count={count} setCount={setCount} 
                    setModal={setModal} 
                    modal={modal} 
                    setTitle={setTitle} 
                    />

                </div>
                    <Resume 
                    typeTransaction={typeTransaction}
                    setTypeTransaction={setTypeTransaction}
                    setMoney={setMoney}
                    setDesc={setDesc}
                    setCat={setCat} 
                    setDate={setDate}
                    tableValues={tableValues}
                    modal={modal} 
                    setModal={setModal} 
                    setTitle={setTitle} 
                    />
            </div>
            {modal && 
                <Modal 
                fetchData={fetchData}
                upObj={upObj}
                typeTransaction={typeTransaction}
                setTypeTransaction={setTypeTransaction}
                money={money}
                cat={cat}
                date={date}
                desc={desc}
                setCat={setCat}
                setDate={setDate}
                setDesc={setDesc}
                modal={modal} 
                setModal={setModal} 
                count={count} 
                setCount={setCount} 
                setMoney={setMoney}
                title={title} 
                inOrOut={inOrOut}
                setInOrOut={setInOrOut}
                />}
        </div>
    );
}
