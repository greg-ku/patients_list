import { useState } from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'

import { usePatients } from '@/utils/api'
import OrderModal from './OrderModal'

const Home = () => {
  const { data, mutate } = usePatients()

  const [orderModal, setOrderModal] = useState({ open: false, patientIndex: -1 })

  return (
    <div>
      <List>
        {data?.map((patient, index) => (
          <ListItemButton
            key={patient._id}
            onClick={() => setOrderModal({ open: true, patientIndex: index })}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={patient.Name} />
          </ListItemButton>
        ))}
      </List>

      <OrderModal
        open={orderModal.open}
        onClose={() => setOrderModal({ open: false, patientIndex: -1 })}
        patient={data?.[orderModal.patientIndex]}
        onUpdatePatientsOrderId={() => mutate()}
      />
    </div>
  )
}

export default Home
