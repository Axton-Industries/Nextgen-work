import { UserCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface StudentModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    students: any[];
    selectedStudent: string | null;
    onSelectStudent: (student: string | null) => void;
}

export const StudentModal = ({
    isOpen,
    onOpenChange,
    students,
    selectedStudent,
    onSelectStudent
}: StudentModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-2xl">
                <DialogHeader className="p-4 border-b bg-muted/30">
                    <DialogTitle className="text-sm font-bold text-foreground uppercase tracking-widest leading-none">
                        Select Student
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh]">
                    <div className="p-4 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Non active now</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {students.filter(s => !s.active).map(student => (
                                    <Button
                                        key={student.id}
                                        variant="outline"
                                        onClick={() => {
                                            onSelectStudent(student.full_name);
                                            onOpenChange(false);
                                        }}
                                        className={cn(
                                            "h-auto justify-start gap-2 p-2 rounded-lg transition-all text-left font-normal opacity-70 grayscale-[0.5] hover:opacity-100 hover:grayscale-0",
                                            selectedStudent === student.full_name
                                                ? 'bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20 hover:bg-primary/20'
                                                : 'bg-background hover:border-primary/30 hover:bg-primary/5 text-foreground'
                                        )}
                                    >
                                        <UserCircle size={14} className="text-muted-foreground" />
                                        <span className="text-xs font-semibold">{student.full_name}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Active now</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {students.filter(s => s.active).map(student => (
                                    <Button
                                        key={student.id}
                                        variant="outline"
                                        onClick={() => {
                                            onSelectStudent(student.full_name);
                                            onOpenChange(false);
                                        }}
                                        className={cn(
                                            "h-auto justify-start gap-2 p-2 rounded-lg transition-all text-left font-normal",
                                            selectedStudent === student.full_name
                                                ? 'bg-primary/10 border-primary/30 text-primary ring-1 ring-primary/20 hover:bg-primary/20'
                                                : 'bg-background hover:border-primary/30 hover:bg-primary/5 text-foreground'
                                        )}
                                    >
                                        <UserCircle size={14} className={selectedStudent === student.full_name ? 'text-primary' : 'text-muted-foreground'} />
                                        <span className="text-xs font-semibold">{student.full_name}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-4 bg-muted/30 border-t">
                    <Button
                        variant="secondary"
                        className="w-full h-9 font-bold text-xs"
                        onClick={() => {
                            onSelectStudent(null);
                            onOpenChange(false);
                        }}
                    >
                        Back to Overview
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
