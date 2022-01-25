import './Table.scss';
import lapis from '../assets/lapis.svg';
import lixeira from '../assets/lixeira.svg';
import { useState } from 'react';
import setaModal from '../assets/setaModal.svg';
import setaFilter from '../assets/setaFiltro.svg';

export default function Table({fetchData, setTypeTransaction, handleEdit, id, tableValues2, setTableValues2, setID}) {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [filterData, setFilterData] = useState(false);
    const [filterDia, setFilterDia] = useState(false);
    const [filtervalor, setFilterValor] = useState(false);
    const [setaDirecao, setSetaDirecao] = useState(false);
    const [setaDirecao2, setSetaDirecao2] = useState(true);
    const [setaDirecao3, setSetaDirecao3] = useState(true);


    async function handleDelete(e){   
        const response = await fetch(`http://localhost:3333/transactions/${id}`,{
            method: "DELETE",
            headers:{
                'content-type': 'application/json'
            }})
            fetchData()   
        setConfirmDelete(false)
    }
    function mudarDirecao(params) {
        switch (params) {
            case 1:
                setSetaDirecao(true)
                setSetaDirecao2(true)
                setSetaDirecao3(true)
                break;
            case 2:
                setSetaDirecao(true)
                setSetaDirecao2(false)
                setSetaDirecao3(true)
                break;
            case 3:
                setSetaDirecao(true)
                setSetaDirecao2(true)
                setSetaDirecao3(false)
                break;
        }
    }
    function handleFilter(params){
        switch (params) {
            case 1:
                switch (filterData) {
                    case false:
                        setTableValues2([...tableValues2].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() ))
                        mudarDirecao(params)
                        break;
                    case true:
                        setTableValues2([...tableValues2].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
                        setSetaDirecao(false)
                        break;
                }
                break;
            case 2:
                switch (filterDia) {
                    case false:
                        setTableValues2([...tableValues2].sort((a,b) =>  new Date(b.date).getDay() - new Date(a.date).getDay() ))
                        mudarDirecao(params)
                        break;
                    case true:
                        setTableValues2([...tableValues2].sort((a,b) => new Date(a.date).getDay() - new Date(b.date).getDay() ))
                        setSetaDirecao2(true)
                        break;
                }
                break;
            case 3:
                switch (filtervalor) {
                    case false:
                        setTableValues2([...tableValues2].sort((a,b) => b.value - a.value ))
                        mudarDirecao(params)
                        break;
                    case true:
                        setTableValues2([...tableValues2].sort((a,b) => a.value - b.value ))
                        setSetaDirecao3(true)
                        break;
                }
                break;
        }     
    }

    return(
        <div className="pai-do-table">
            <table key="10" className="table">
                <thead className="table-head">
                    <th className="table-columm" id="date"><button onClick={() => {
                        handleFilter(1)
                        setFilterData(filterData === false? true:false)
                        }}>Data <img src={setaFilter} className={!setaDirecao ? '':'rotate'}/></button></th>

                    <th className="table-columm" id="week-day"><button onClick={() => {
                        handleFilter(2)
                        setFilterDia(filterDia === false? true:false)
                        }}>Dia da semana <img src={setaFilter} className={!setaDirecao2 ? '':'rotate'} /></button></th>

                    <th className="table-columm"><button>Descrição</button></th>
                    <th className="table-columm"><button>Categoria</button></th>

                    <th className="table-columm" id="value"><button onClick={() => {
                        handleFilter(3)
                        setFilterValor(filtervalor === false? true:false)
                        }
                        }>Valor <img src={setaFilter} className={!setaDirecao3 ? '':'rotate'} /></button></th>

                    <th className="table-columm last">--------</th>
                </thead>
                {tableValues2.map(function (t) {
                    return([
                        <>
                            <tr className="table-line" key={t.id}>
                                <td  className="line-items">{
                                    t.date.replaceAll('-', '/').split("/").reverse().join("/")
                                }</td>
                                <td  className="line-items">{t.week_day}</td>
                                <td  className="line-items">{t.description}</td>
                                <td  className="line-items">{t.category}</td>
                                <td  className="line-items"
                                    type={t.type}>
                                    R$ {t.value.toFixed(2).replace('.', ',')}</td>
                                <td  className="line-items">
                                    <button id={t.id} className="edit-icon" onClick={(e) => {
                                        handleEdit(e)
                                        setTypeTransaction("editar")
                                        }}>
                                    <img id={t.id} src={lapis} alt="lapis icon" />
                                    </button>

                                    <button id={t.id} onClick={(e) => {
                                        setConfirmDelete(true)
                                        setID(e.target.id)
                                    }} className="delete-icon"><img id={t.id} src={lixeira} alt="lixeira icon" /></button>
                                </td>
                                {confirmDelete && id == t.id && (<td className="container-confirm-delete">
                                    <img className='setaFiltro' src={setaModal}/>
                                    <p>Apagar item?</p>
                                    <div>
                                        <button className="btn-action-confirm" onClick={handleDelete} >Sim</button>
                                        <button className="btn-action-delete" onClick={() => setConfirmDelete(false)}>Não</button>
                                    </div>
                                </td>)}
                            </tr>
                        </>
                    ])
                })
                }
            </table>
        </div>
    )
}