import { Home, BookOpen, MessageSquare, LayoutGrid, CheckSquare, Bot, GraduationCap, Sparkles, Binary, Video, Headphones } from 'lucide-react';
import { IconButton } from '../IconButton';

export const Sidebar = () => {
    return (
        <aside className="w-12 bg-background border-r flex flex-col items-center py-2 gap-2 sticky top-0 h-screen shadow-sm hidden md:flex">
            <div className="w-6 h-6 rounded-full border border-destructive/50 flex items-center justify-center text-destructive font-bold text-[9px] mb-2">
                NF
            </div>
            <IconButton icon={Home} />
            <IconButton icon={BookOpen} />
            <IconButton icon={MessageSquare} />
            <IconButton icon={LayoutGrid} active />
            <IconButton icon={CheckSquare} />
            <IconButton icon={Bot} />
            <IconButton icon={GraduationCap} />
            <IconButton icon={Sparkles} />
            <IconButton icon={Binary} />
            <IconButton icon={Video} />
            <IconButton icon={Headphones} />
            <IconButton icon={BookOpen} />
        </aside>
    );
};
