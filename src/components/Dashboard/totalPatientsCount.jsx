import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function TotalPatientsCount() {
  const [totalPatients, setTotalPatients] = React.useState(0);

  React.useEffect(() => {
    fetchTotalPatients();
  }, []);

  const fetchTotalPatients = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch total patients');
      }
      const data = await response.json();
      setTotalPatients(data.data.length);
    } catch (error) {
      console.error('Failed to fetch total patients:', error);
    }
  };

  // Get the current date
  const currentDate = new Date();

  // Format the date as "Month Day, Year"
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Define custom title style
  const titleStyle = {
    color: 'blue',
    textAlign: 'center',
    fontSize: '2rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  return (
    <React.Fragment>
      <Title style={titleStyle}>Total Patients</Title>
      <br />
      <Typography component="p" variant="h4" sx={{ color: 'blue', fontSize: '100px', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
        {totalPatients}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, fontSize: '20px', textAlign: "center", fontStyle: 'italic', color: 'gray' }}>
        {formattedDate} {/* Display the formatted date */}
      </Typography>
    </React.Fragment>
  );
}
