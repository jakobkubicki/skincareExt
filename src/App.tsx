import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import { green } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState('')
  const [finalSelectedText, setFinalSelectedText] = useState('') // to remember the user's final selection
  const [mode, setMode] = useState('idle') // idle, selecting, analyzing

  const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }))

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'selected_text') {
        setSelectedText(request.text)
      } else if (request.message === 'selected_text_done') {
        setMode('idle')
      }
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && mode === 'selecting') {
        setMode('analyzing')
        setFinalSelectedText(selectedText) // Save the final selection when Enter is pressed
        chrome.runtime.sendMessage({
          message: 'analyze_product',
          text: selectedText
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [mode, selectedText])

  const handleAnalyzeClick = () => {
    setMode('selecting')
    chrome.runtime.sendMessage({ message: 'start_selection' })
  }

  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Typography variant='h4' component='div' gutterBottom>
          🌿 Skincare Product Analyzer
        </Typography>
        {mode === 'idle' ? (
          <StyledButton
            startIcon={<SearchIcon />}
            variant='contained'
            onClick={handleAnalyzeClick}
          >
            Analyze Product
          </StyledButton>
        ) : mode === 'selecting' ? (
          <TextField
            id='outlined-basic-read-only-input'
            label='Selected Text'
            defaultValue=''
            InputProps={{
              readOnly: true
            }}
            variant='filled'
            value={selectedText}
          />
        ) : (
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h6' gutterBottom>
              Searching for {finalSelectedText}...
            </Typography>
            <Box mt={2}>
              <CircularProgress color='inherit' />
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default App
