import './Modal.scss';
import CloseBtn from "../assets/closeBtn.svg";
import { useEffect, useRef, useState } from 'react';

export default function Modal({fetchData, upObj, typeTransaction, money, cat, setCat, setDate, setDesc, date, desc, setModal, setInOrOut, inOrOut, title, setMoney}){
    const creditRef = useRef();
    const debitRef = useRef();
    const moneyRef = useRef();
    const catRef = useRef();
    const dateRef = useRef();
    const descRef = useRef();
    const weekDay = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];


    function handleClick() {
       setModal(false);
    }
    function handleChoice(params) {
        if(params === 1){
            setInOrOut(1)
            
        }
        if(params === 2){
            setInOrOut(2)
        }
    }
    async function handleSubmit(typeTransaction) {
        if(!money){
            moneyRef.current.focus()
            return
        }
        if(!cat){
            catRef.current.focus()
            return
        }
        if(!date){
            dateRef.current.focus()
            return
        }
        if(!desc){
            descRef.current.focus()
            return
        }

        typeTransaction === "adicionar" ? fetchPost() : fetchPut()
        
    }
    async function fetchPut() {
        const body = {
            "date": date,
            "week_day": weekDay[(new Date(date.toString()).getDay()) + 1],
            "description": desc,
            "value": Number(money),
            "category": cat,
            "type": inOrOut === 1 ? "credit" : "debit"
        }

        const response = await fetch(`http://localhost:3333/transactions/${upObj.id}`,{
            method: "PUT",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        setModal(false)
        fetchData()
    }

    async function fetchPost(){
        const dia = (new Date(date.toString()).getDay()) +1 
        const body = {
            "date": date,
            "week_day": weekDay[dia > 6 ? 0:dia],
            "description": desc,
            "value": Number(money),
            "category": cat,
            "type": inOrOut === 1 ? "credit" : "debit"
        }

        try {
            const response = await fetch('http://localhost:3333/transactions',{
            method: "POST",
            headers:{
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(body)
            });
            setModal(false)
            fetchData()
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        if(inOrOut === 1){
            creditRef.current.style.setProperty("background-image", "linear-gradient(91.26deg, #FA8C10 0%, #FF576B 97.77%)")
            debitRef.current.style.setProperty("background-image", "")
        }
        if(inOrOut === 2){
            debitRef.current.style.setProperty("background-image", "linear-gradient(91.26deg, #05EDE3 0%, #3A9FF1 97.77%)")
            creditRef.current.style.setProperty("background-image", "")
        }
    }, [inOrOut]);

    return(
        <div className="modal-container">
            <form onSubmit={e => e.preventDefault()} className="modal-section">
                <div className="modal-section--header">
                    <p>{title}</p>
                    <button><img onClick={handleClick} src={CloseBtn} alt="close ico" className="close-icon" /></button>
                </div>
                <div className="buttons">
                    <button ref={debitRef} onClick={() => handleChoice (2)} id="debit-button" className="debit-button">Entrada</button>
                    <button ref={creditRef} onClick={() => handleChoice (1)} id="credit-button" className="credit-button">Saída</button>
                </div>
                <div className="transfer-inputs">       
                    <label htmlFor="money">Valor</label>
                    <input 
                    ref={moneyRef}
                    required
                    name="value"
                    value={money}
                    onChange={e => setMoney(e.target.value)}
                    type="number" 
                    id="money" 
                    className="input input-value"/> 

                    <label htmlFor="cat">Categoria</label>
                    <input 
                    ref={catRef}
                    required
                    name="category"
                    value={cat}
                    onChange={e => setCat(e.target.value)}
                    type="text"
                    id="cat"
                    className="input input-category"/>  

                    <label htmlFor="date">Data</label>
                    <input
                    ref={dateRef}
                    required
                    name="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    type="date" 
                    id="date" 
                    className="input input-date"/>  

                    <label htmlFor="desc">descrição</label>
                    <input 
                    ref={descRef}
                    required
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    type="text" 
                    id="desc"
                    className="input input-desc"/>          
                 </div>
                <div className="div-insert">
                    <button onClick={() => handleSubmit(typeTransaction)} className="btn-insert">Confirmar</button>
                </div>
            </form>
        </div>
    )
}