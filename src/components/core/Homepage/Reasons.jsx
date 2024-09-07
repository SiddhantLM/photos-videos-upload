import React from 'react'
import Card from '../../common/Card'

const Reasons = ({heading,content}) => {
return (
    <div className='w-full'>

      <Card heading={heading} content={content} />
{/* 
      <h1>{heading}</h1>
      <p>{content}</p> */}
    </div>
  )
}

export default Reasons
