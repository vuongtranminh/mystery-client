import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import EnqueueInput from './enqueue-input'

const QueueCard = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <EnqueueInput />
        </CardHeader>
      </Card>
      <CardContent>
        <ScrollArea className="">
          <div className="p-4">
            
          </div>
        </ScrollArea>
      </CardContent>
    </div>
  )
}

export default QueueCard