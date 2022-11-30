import { Grid } from '@mui/material';
import Box from '@mui/system/Box';
import { useEffect, useState } from 'react';
import { useUser } from '../../features/user';
import { PageProps } from '../../shared';
import CompanyCard from './company-card.component';
import Company from '../../features/user/company.interface';

export default function CompanyCards({ sx }: PageProps) {
  const { companies, setCurrentCompany } = useUser();
  const [selected, setSelected] = useState<Company | null>(null);

  const onSelectCompany = (id: string) => () => {
    const company = companies?.filter((company) => company._id === id)[0];
    if (company) {
      setSelected(company);
    }
  };

  useEffect(() => {
    if (selected) {
      setCurrentCompany(selected);
    }
  }, [selected]);

  return (
    <Box
      sx={{
        ...sx,
      }}
    >
      <Grid container spacing={2}>
        {companies &&
          companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={company._id}>
              <CompanyCard
                company={company}
                onSelect={onSelectCompany(company._id)}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
