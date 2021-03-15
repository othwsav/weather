import React from 'react'

const Load = () => {
    return (
        <div className="loading">
            <div>
                <img src={process.env.PUBLIC_URL + '/images/loading.svg'} alt="loading" />
            </div>
        </div>
    )
}

export default Load