import React, { useState } from 'react'

import { Button, Dropdown, Space } from 'antd'


const TableActionsCell = ({
  id,
  nameField,
  deleteMenu,
  destroyRoute,
  autoRoute = true,
  beforeDestroy,
  onDestroy: onDestroyProps,
  children,
  items,
  ...props
}) => {
  const [viewSelectVisible, setViewSelectVisible] = useState(false)
  const { [nameField]: name } = props

  async function onDestroy() {
    setViewSelectVisible(false)
    if (beforeDestroy) {
      if (!(await beforeDestroy())) return
    }

    const destroyRoute_ =
      typeof destroyRoute === 'function' ? destroyRoute(id) : destroyRoute

    
  }

  return (
    <Space
      size="small"
    >
      <Dropdown
        trigger={['click']}
        open={viewSelectVisible}
        onOpenChange={setViewSelectVisible}
        menu={{
          items: [
            {
              key: '1',
              label: <a href={`/edit/${id}`}>editar</a>
            },
            deleteMenu && {
              key: '2',
              label: <a onClick={onDestroy}>Inativar</a>
            },
            ...(items || [])
          ]
        }}
      >
        <Button
          className={'flex items-center flex-row-reverse'}
          size="small"
        >
          *
        </Button>
      </Dropdown>
    </Space>
  )
}

export default TableActionsCell
