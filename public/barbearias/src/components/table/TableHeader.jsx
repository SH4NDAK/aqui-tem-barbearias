import React from 'react'

import { Button } from 'antd'
import Title from 'antd/es/typography/Title'
import { useNavigate, useLocation } from 'react-router-dom';


const TableHeader = ({ title, addRouter, addText = "+", backButton, backRoute }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
      }}
    >
      <div className='flex flex-row gap-4 items-center'>
        {backButton && (
          <Button
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            type="primary"
            icon={<h1>{backButton}</h1>}
            onClick={() => navigate(-1)}
          />
        )}
        <Title level={3}>{title}</Title>
      </div>
      {addRouter && (
        <Button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          type="primary"
          icon={<h1>{addText}</h1>}
          onClick={() => navigate(`${location.pathname}${addRouter}`)}
        />
      )}
    </div>
  )
}

export default TableHeader
