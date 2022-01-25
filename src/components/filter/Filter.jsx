import './Filter.scss';
import FilterIcon from "../assets/filtro.svg";
import CloseBtn from "../assets/closeBtn.svg";
import { useState } from 'react';


export default function Filter ({tableValues, hanldeClearfilters, handleFilters, valueMax, valueMin, setValueMax, setValueMin, setTableValues, fetchData}){
    function Btn({data, id}) {
        return(
            <button id={id} onClick={(e) => handleAdicionarFilters(e)}>{data}<img src={CloseBtn}/></button>
        )
    }
    const [filterShow, setFilterShow] = useState(false);     
    const data = [
        {value: "Segunda"},
        {value: "Terça"},
        {value: "Quarta"},
        {value: "Quinta"},
        {value: "Sexta"},
        {value: "Sábado"},
        {value: "Domingo"}
    ];
    const [filtros, setFiltros] = useState([
        {Domingo: false},
        {Segunda: false},
        {Terça: false},
        {Quarta: false},
        {Quinta: false},
        {Sexta: false},
        {Sábado: false}
    ]);
    function handleAdicionarFilters(e) {
        setFiltros({...filtros, sexta: !filtros.sexta ? true:false})
    }
    const categoryFilter = [...new Set(tableValues.map((t) => t.category))];

    return(
        <div className ="filter-root">
            <button className="open-filters-button" onClick={() => setFilterShow(filterShow === true ? false:true)}><img src={FilterIcon} alt="filter icon" />Filtrar</button>
            {filterShow && <div className="container-filters">
                <div className="div-filters">
                    <p>Dia da semana</p>
                    <div>
                    {data.map(function(data) {
                        return (
                            <Btn id={data.value} data={data.value} />
                        )
                    })}
                    </div>
                </div>
                <div className="div-filters">
                    <p>Categoria</p>
                    <div>
                        {categoryFilter.map(function(data) {
                            return (
                                <Btn data={data} />
                            )
                        })}
                    </div>
                </div>
                <div className="div-filters">
                    <p>Valor</p>
                    <label htmlFor="min-value">Min</label>
                        <input 
                        required
                        value={valueMin}
                        onChange={e => setValueMin(e.target.value)}
                        type="number" 
                        name="valueMin" 
                        id="min-value" />
                    <label htmlFor="min-value">Max</label>
                        <input 
                        required
                        value={valueMax}
                        onChange={e => setValueMax(e.target.value)}
                        type="number"
                        name="valueMax" 
                        id="max-value" />
                </div>
                <div className="div-btn-filters">
                    <button className="btn-clear-filters" onClick={hanldeClearfilters}>Limpar filtros</button>
                    <button className="btn-apply-filters" onClick={handleFilters}>Aplicar filtros</button>
                </div>
            </div>}
        </div>
    )
}