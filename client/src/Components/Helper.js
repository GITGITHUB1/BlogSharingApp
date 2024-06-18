import React, { useRef } from 'react'

const Helper = (props) => {
   
    return (
        props.elem.messages?.map((mess) => {
           
            return <>
                <div className="row featurette">
                    
                        <div className="col-md-12 m-auto" style={{backgroundColor:'#f0f2f5'}}>
                            <p className="lead text-center display-4">"{mess.message}"</p>
                            <h2 className="featurette-heading text-center mt-1">Quote By {mess.name}</h2>
                        </div>
                    
                        
                </div>
                <hr className="featurette-divider my-5" />
            </>
        })
    )
}

export default Helper