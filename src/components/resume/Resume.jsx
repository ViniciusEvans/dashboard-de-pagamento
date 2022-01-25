import './Resume.scss'

export default function Resume ({setModal, setTypeTransaction, setTitle, setMoney, setDesc, setCat, setDate, tableValues}) {
    function handleclick(){
        setModal(true)
        setTitle('Adicionar registro')
        setMoney('');
        setDate('');
        setCat('');
        setDesc(''); 
    }
    const credit = tableValues.filter(function (t) {
        return t.type === "credit"
    })
    const debit = tableValues.filter(function (t) {
        return t.type === "debit"
    })
    let somaDebit = 0
    debit.forEach(element => {
        somaDebit+=element.value
    })
    let somaCredit = 0
    credit.forEach(element => {
        somaCredit+=element.value
    })

    return(
        
        <div className="container-resume">
            <div className="resume-section">
                <h2 className="resume-title">Resumo</h2>
                <p><span>Entradas</span><span className="in">R${somaDebit.toFixed(2).replace('.', ',')}</span></p>
                <p className="father-out"><span>Saídas</span><span className="out">R${somaCredit.toFixed(2).replace('.', ',')}</span></p>
                <p><span>Saldo</span><span className="balance">R${(somaDebit-somaCredit).toFixed(2).replace('.', ',')}</span></p>
            </div>
            <button className="btn-add" onClick={() => {
                handleclick()
                setTypeTransaction("adicionar")
                }}>Adicionar registro</button>
        </div>
    );
}