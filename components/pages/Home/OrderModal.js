import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import styled from '@emotion/styled'

import { useOrderById, createOrder, editOrder } from '@/utils/api'

const Wrapper = styled(Paper)`
  width: 600px;
  max-width: 100%;
  height: 500px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`

const StyledModal = styled(Modal)`
  &.MuiModal-root {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledTextField = styled(TextField)`
  &.MuiTextField-root {
    height: 100%;

    & > .MuiInputBase-root {
      height: 100%;
      align-items: flex-start;
    }
  }
`

const OrderModal = ({ open, onClose, paitent, onUpdatePaitentsOrderId }) => {
  const { data: order, isLoading, mutate } = useOrderById(paitent?.OrderId)

  const [mode, setMode] = useState('preview')
  const [text, setText] = useState('')

  const onEditClick = () => {
    setText(order.Message || '')
    setMode('edit')
  }

  const onModalClose = () => {
    if (mode !== 'preview') {
      setMode('preview')
    }
    if (onClose) {
      onClose()
    }
  }

  const onConfirmClick = () => {
    if (mode === 'add') {
      onCreateOrder()
    } else if (mode === 'edit') {
      onEditOrder()
    }
  }

  const onCreateOrder = async () => {
    const [result, error] = await createOrder(paitent.Id, text)
    if (!error) {
      setMode('preview')
      if (onUpdatePaitentsOrderId) {
        onUpdatePaitentsOrderId(result.Id)
      }
    }
  }

  const onEditOrder = async () => {
    const [result, error] = await editOrder(order.Id, text)
    if (!error) {
      setMode('preview')
      mutate()
    }
  }

  return (
    <div>
      <StyledModal
        open={open}
        onClose={onModalClose}
      >
        <Wrapper>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            {!isLoading && !!order && (
              <IconButton
                onClick={onEditClick}
                disabled={mode === 'edit'}
              >
                <EditIcon />
              </IconButton>
            )}
            {!isLoading && !order && (
              <IconButton
                onClick={() => setMode('add')}
                disabled={mode === 'add'}
              >
                <AddIcon />
              </IconButton>
            )}
            <IconButton onClick={onModalClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box p={2} flexGrow={1}>
            {mode !== 'preview'
              ? <Box display="flex" flexDirection="column" height="100%">
                  <Box flexGrow={1}>
                    <StyledTextField
                      multiline
                      placeholder="請在此處輸入醫囑..."
                      fullWidth
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Box>
                  <Box mt={2} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={onConfirmClick}
                      >
                        確認
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setMode('preview')}
                      >
                        取消
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              : <Typography>{order?.Message}</Typography>
            }
          </Box>
        </Wrapper>
      </StyledModal>
    </div>
  )
}

export default OrderModal
