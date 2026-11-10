import type { QuickAction } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface ActionPanelProps {
  action: QuickAction | null;
  onClose: () => void;
}

export function ActionPanel({ action, onClose }: ActionPanelProps) {
  return (
    <Dialog open={!!action} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="dashboard.action_panel"
        className="max-w-sm rounded-3xl border-border bg-popover"
      >
        <DialogHeader>
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <DialogTitle className="text-center font-display text-lg">
            {action?.title} simulated
          </DialogTitle>
          <DialogDescription className="text-center">
            This is a sandbox educational prototype. No real{" "}
            {action?.title.toLowerCase()} transfer was made and no funds moved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            data-ocid="dashboard.action_panel.close_button"
            onClick={onClose}
            className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
