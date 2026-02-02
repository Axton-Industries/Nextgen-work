import { X, UserCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentSearchProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    isSearchFocused: boolean;
    setIsSearchFocused: (focused: boolean) => void;
    searchSuggestions: any[];
    setSelectedStudent: (student: string | null) => void;
}

export const StudentSearch = ({
    searchValue,
    setSearchValue,
    isSearchFocused,
    setIsSearchFocused,
    searchSuggestions,
    setSelectedStudent
}: StudentSearchProps) => {
    return (
        <div className="relative w-[150px]">
            <Input
                type="text"
                placeholder="Search students..."
                className="h-7 pl-2 pr-6 bg-muted/50 border-none text-[10px] focus-visible:ring-1 focus-visible:ring-primary transition-all font-medium"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            {isSearchFocused && searchSuggestions.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-1 shadow-lg z-[100] py-1">
                    <ScrollArea className="max-h-[200px]">
                        {searchSuggestions.map(student => (
                            <button
                                key={student.id}
                                className="w-full text-left px-2 py-1.5 hover:bg-muted text-[10px] font-medium flex items-center gap-2 transition-colors"
                                onClick={() => {
                                    setSelectedStudent(student.full_name);
                                    setSearchValue('');
                                }}
                            >
                                <UserCircle size={10} className="text-primary" />
                                {student.full_name}
                            </button>
                        ))}
                    </ScrollArea>
                </Card>
            )}
            <X
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground"
                size={10}
                onClick={() => {
                    setSearchValue('');
                    setSelectedStudent(null);
                }}
            />
        </div>
    );
};
