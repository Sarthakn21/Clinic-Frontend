import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function PendingAppointmentCount() {
  const [pendingAppointments, setPendingAppointments] = React.useState(0);

  React.useEffect(() => {
    fetchPendingAppointments();
  }, []);

  const fetchPendingAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pending appointments');
      }
      const data = await response.json();
      setPendingAppointments(data.data.length);
    } catch (error) {
      console.error('Failed to fetch pending appointments:', error);
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

  return (
    <React.Fragment>
      <Title>Pending Appointments</Title>
      <Typography component="p" variant="h4" sx={{ color: 'blue',paddingTop:'23px', fontSize: '100px', textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
        {pendingAppointments}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, fontSize: '20px', textAlign: "center", fontStyle: 'italic', color: 'gray' }}>
        {formattedDate} {/* Display the formatted date */}
      </Typography>
    </React.Fragment>
  );
}
