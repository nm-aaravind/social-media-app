import React from 'react'
import { Paper, TextField } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
function SearchBar({ search, setSearch }) {
    const handleChange = (event) => {
        setSearch(event.target.value)
    }
    return (
        <Paper className='h-16 overflow-hidden flex items-center drop-shadow-form' square sx={{
            backgroundColor: 'primary.light', ":focus-within": {
                border: '1px solid #ebe8e888'
            }, border: '1px solid #fff2'
        }}>
            <SearchOutlined sx={{ color: '#ebe8e877', position: 'absolute', translate: '15px -2px', width: '2.3rem', height: '2.3rem' }} />
            <TextField value={search} onChange={handleChange} placeholder='Search' name='location' id="location" variant="outlined" fullWidth InputProps={{ sx: { fontSize: 26, borderRadius: 0, color: 'white', paddingX: '3rem' } }} />
        </Paper>
    )
}

export default SearchBar