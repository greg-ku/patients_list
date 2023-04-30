import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'

import { usePaitents } from '@/utils/api'

const Home = () => {
  const { data } = usePaitents()

  return (
    <>
      <List>
        {data?.map((paitent) => (
          <ListItemButton key={paitent._id}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={paitent.Name} />
          </ListItemButton>
        ))}
      </List>
    </>
  )
}

export default Home
