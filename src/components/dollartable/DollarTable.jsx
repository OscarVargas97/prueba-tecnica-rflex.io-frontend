import * as React from 'react'
import { useState } from 'react'
import Paper from '@mui/material/Paper'
import { sample, createData, loadMoreRows } from './logic/dataLoad'
import RowContent from './RowContent'
import fixedHeaderContent from './FixedHeaderContent'
import { TableVirtuoso } from 'react-virtuoso'
import { VirtuosoTableComponents } from './CustomVirtuosoTable'
import { Button, Card, CardActionArea, CardActions, CardContent } from '@mui/material'

export default function DollarTable () {
  const [rows, setRows] = useState(() => Array.from({ length: 10 }, (_, index) => {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)]
    return createData(index, ...randomSelection)
  }))

  const loadMore = () => {
    setRows((prevRows) => {
      const newRows = loadMoreRows(prevRows)
      return [...prevRows, ...newRows]
    })
  }

  return (

    <Card style={{ height: '93%', width: '100%' }}>
      <CardContent style={{ height: '100%', width: '100%' }}>

        <Paper style={{ height: '100%', width: '100%' }}>
          <TableVirtuoso
            data={rows}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={RowContent}
            endReached={loadMore}
          />
        </Paper>
      </CardContent>
    </Card>
  )
}