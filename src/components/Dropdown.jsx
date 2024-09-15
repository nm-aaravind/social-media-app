import React from 'react'

const Dropdown = ({ content, children }) => {
  return (
    <div className='cursor-pointer relative py-1 h-16 [&>li]:invisible [&>li]:hover:visible font-varela [&>li]:hover:translate-y-1 [&>li]:hover:opacity-100'>
      {children}
      <li className='list-none bg-light border border-primary-light sm:-translate-x-3/4 md:translate-x-0 text-primary absolute opacity-0 -translate-y-1 rounded-md overflow-hidden transition-all duration-300'>
        {
          content.map((value, index) => {
            return <ul key={index} className='px-10 py-3 hover:bg-primary-light transition-colors hover:text-white text-center whitespace-nowrap' onClick={() => {
              value.action(value.arg)
            }}>{value.value}</ul>
          })
        }
      </li>
    </div>
  )
}

export default Dropdown