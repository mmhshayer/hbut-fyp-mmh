import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

interface ConfirmDialogProps {
  title: string;
  description?: string;
  loading?: boolean;
  open: boolean;
  onClose: () => void;
  onAccept?: () => void;
  onDisagree?: () => void;
  proceedDialog?: boolean;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  description,
  loading,
  open,
  onClose,
  onAccept,
  onDisagree,
  proceedDialog,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle
        id='alert-dialog-title'
        sx={{
          paddingTop: '1.5rem',
          paddingX: '1.5rem',
          paddingBottom: '.5rem',
        }}
      >
        {title}
      </DialogTitle>
      {description && (
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {description}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions
        sx={{
          paddingTop: '0.5rem',
          paddingBottom: '1.5rem',
          paddingX: '1.5rem',
        }}
      >
        <Button
          variant='outlined'
          onClick={onDisagree ? onDisagree : onClose}
          disabled={loading}
        >
          {proceedDialog ? 'Cancel' : 'No'}
        </Button>
        <Button
          variant={proceedDialog ? 'contained' : 'outlined'}
          color={proceedDialog ? 'primary' : 'error'}
          onClick={onAccept ? onAccept : onClose}
          disabled={loading}
          autoFocus
        >
          {loading && (
            <CircularProgress
              color='inherit'
              size={'1rem'}
              sx={{
                my: 0.25,
                mr: 1,
              }}
            />
          )}
          {proceedDialog ? 'Proceed' : 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
