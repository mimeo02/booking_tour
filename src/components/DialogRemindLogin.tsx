import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogReminLoginProps {
  open: boolean;
  handleClose: () => void;
}


export const DialogRemindLogin = (props: DialogReminLoginProps) => {
  return (
     <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          ✋ Cần Đăng nhập để Tiếp tục
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={props.handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          Bạn cần phải đăng nhập để sử dụng tính năng này
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            ĐÓNG
          </Button>
        </DialogActions>
      </BootstrapDialog>
  );
};
