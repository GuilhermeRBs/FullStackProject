import { Card, CardContent, Typography } from '@mui/material';

const DashboardCard = ({ title, value }) => (
  <Card sx={{ minWidth: 275, marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold">{title}</Typography>
      <Typography variant="body1" color="textSecondary">{value}</Typography>
    </CardContent>
  </Card>
);

export default DashboardCard;
