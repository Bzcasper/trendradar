
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { availableWidgets, WidgetType } from "./types";
import { getWidgetIcon } from "./Sidebar/WidgetIcon";

interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget: (type: WidgetType) => void;
}

export function AddWidgetDialog({ open, onOpenChange, onAddWidget }: AddWidgetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Select a widget to add to your dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {availableWidgets.map((widget) => (
            <Button
              key={widget.type}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center"
              onClick={() => onAddWidget(widget.type)}
            >
              <div className="w-16 h-16 mb-2">
                {getWidgetIcon(widget.type)}
              </div>
              <span className="text-sm font-medium">{widget.title}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
