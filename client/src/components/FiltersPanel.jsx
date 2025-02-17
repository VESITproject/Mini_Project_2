// import React, { useState } from 'react';
// import { TextField, MenuItem, Button, Box, Grid } from '@mui/material';

// export function FiltersPanel({ onApplyFilters }) {
//   const [location, setLocation] = useState('');
//   const [pollutant, setPollutant] = useState('');
//   const [timeRange, setTimeRange] = useState('7');

//   const handleApplyFilters = () => {
//     onApplyFilters({ location, pollutant, timeRange });
//   };

//   const inputStyles = {
//     '& .MuiInputLabel-root': { 
//       color: '#3f51b5',
//       padding: '0 4px',
//       transform: 'translate(10px, -2px) scale(0.7)',
//       zIndex: 1,
//     },
//     '& .MuiOutlinedInput-root': { 
//       borderRadius: '8px',
//       bgcolor: 'rgba(31, 41, 55, 0.3)',
//       '& fieldset': {
//         borderColor: 'transparent',
//       },
//       '&:hover fieldset': {
//         borderColor: '#3f51b5',
//       },
//     },
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={3}>
//           <TextField
//             label="Location"
//             variant="outlined"
//             fullWidth
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             sx={inputStyles}
//           />
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <TextField
//             label="Select Pollutant"
//             select
//             fullWidth
//             value={pollutant}
//             onChange={(e) => setPollutant(e.target.value)}
//             sx={inputStyles}
//           >
//             <MenuItem value="AQI">AQI</MenuItem>
//             <MenuItem value="PM2.5">PM2.5</MenuItem>
//             <MenuItem value="PM10">PM10</MenuItem>
//             <MenuItem value="CO">CO</MenuItem>
//             <MenuItem value="NO">NO</MenuItem>
//             <MenuItem value="NO2">NO2</MenuItem>
//             <MenuItem value="SO2">SO2</MenuItem>
//             <MenuItem value="O3">O3</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <TextField
//             label="Select Time Range"
//             select
//             fullWidth
//             value={timeRange}
//             onChange={(e) => setTimeRange(e.target.value)}
//             sx={inputStyles}
//           >
//             <MenuItem value="7">Last 7 Days</MenuItem>
//             <MenuItem value="31">Last Month</MenuItem>
//             <MenuItem value="365">Last Year</MenuItem>
//             <MenuItem value="730">Last 2 Years</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={handleApplyFilters}
//             sx={{
//               height: '56px',
//               bgcolor: 'primary.main',
//               '&:hover': {
//                 bgcolor: 'primary.dark',
//               }
//             }}
//           >
//             Apply Filters
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

import React, { useState } from "react"
import { TextField, MenuItem, Button, Box, Grid } from "@mui/material"

export function FiltersPanel({ onApplyFilters }) {
  const [location, setLocation] = useState("")
  const [timeRange, setTimeRange] = useState("7")

  const handleApplyFilters = () => {
    onApplyFilters({ location, timeRange })
  }

  const inputStyles = {
    "& .MuiInputLabel-root": {
      color: "#3f51b5",
      padding: "0 4px",
      transform: "translate(10px, -2px) scale(0.7)",
      zIndex: 1,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      bgcolor: "rgba(31, 41, 55, 0.3)",
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "#3f51b5",
      },
    },
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Select Time Range"
            select
            fullWidth
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            sx={inputStyles}
          >
            
             <MenuItem value="1">Today's</MenuItem>
            <MenuItem value="7">Last 7 Days</MenuItem>
            <MenuItem value="31">Last Month</MenuItem>
            <MenuItem value="365">Last Year</MenuItem>
            <MenuItem value="730">Last 2 Years</MenuItem>
            <MenuItem value="-7">next 7 Days (forecasting ) </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApplyFilters}
            sx={{
              height: "56px",
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Apply Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

