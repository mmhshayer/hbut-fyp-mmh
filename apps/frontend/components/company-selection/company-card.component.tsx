import Company from '../../features/user/company.interface';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface CompanyCardProps {
  company: Company;
  onSelect: () => void;
}

export default function CompanyCard({ company, onSelect }: CompanyCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        height: 1,
        bgcolor: 'transparent',
        borderWidth: 2,
        borderColor: 'grey.300',
        borderStyle: 'solid',
        px: 4,
        py: 2,
      }}
      elevation={0}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {company.name}
      </Typography>
      <Button onClick={onSelect}>
        Select
        <ArrowForwardIcon sx={{ ml: 1 }} />
      </Button>
    </Card>
  );
}
