import { useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'

import { usePaitents } from '@/utils/api'
import OrderModal from './OrderModal'

const Home = () => {
  const { data, mutate } = usePaitents()

  const [orderModal, setOrderModal] = useState({ open: false, paitentIndex: -1 })

  return (
    <div>
      <List>
        {data?.map((paitent, index) => (
          <ListItemButton
            key={paitent._id}
            onClick={() => setOrderModal({ open: true, paitentIndex: index })}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={paitent.Name} />
          </ListItemButton>
        ))}
      </List>

      <OrderModal
        open={orderModal.open}
        onClose={() => setOrderModal({ open: false, paitentIndex: -1 })}
        paitent={data?.[orderModal.paitentIndex]}
        onUpdatePaitentsOrderId={() => mutate()}
      />
    </div>
  )
}

export default Home
