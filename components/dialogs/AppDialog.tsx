import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';

interface AppDialogProps {
  children: JSX.Element;
  dialogTrigger: JSX.Element;
  dialogTitle: string;
  dialogFooter?: JSX.Element;
  open?: boolean | undefined;
  setOpen?: (open: boolean) => void;
  key: string;
}

const AppDialog = ({
  dialogTrigger,
  dialogTitle,
  children,
  open = undefined,
  setOpen,
  key,
}: AppDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} key={key}>
      <DialogTrigger>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export { AppDialog };
