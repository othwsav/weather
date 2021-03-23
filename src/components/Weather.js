import React from 'react'

const Weather = props => {


    const {wev,wen,icon,error} = props
    
    let wElem, wElems, iconElem, errorElem
    
    if(error === false){
        wElems = wen.map((e,i) => {
            return  <div key={i} className="data_element">
                        <span>
                            <img src={process.env.PUBLIC_URL + `/images/${i}.svg`} alt={e + ' wheather'} />
                        </span>
                        <span>{e}:</span>
                        <span>{wev[i]}</span>
                    </div>
        })

        wElem = <div className="elems">{wElems}</div>

        iconElem =  <div className="icon">
                        <span>general weather:</span>
                        <div>
                            <img src={icon} alt="weather icon"/>
                        </div>
                    </div>
    }else{
        if(typeof error === "string")
            errorElem = <div className="error">{error}</div>
    }
    

    return (
        <div>
            {iconElem}
            {wElem}
            {errorElem}
        </div>
    )
}

export default Weather