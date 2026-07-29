import { useState } from 'react';
import { Menu, X, Search, Bell, Calendar, ChevronDown, Users, MapPin, Clock } from 'lucide-react';

const events = [
    {
        id: 1,
        month: 'OCT',
        day: '24',
        category: 'Academic',
        spots: '12 spots left',
        spotsFull: false,
        title: 'Application Development Practice',
        organizer: 'ADP Graduate Union',
        time: '2:00 PM',
        location: 'District Six Room 1.19',
        // TODO: replace with real image → src={eventImage}
        image: null,
    },
    {
        id: 2,
        month: 'OCT',
        day: '26',
        category: 'Social',
        spots: 'Full House',
        spotsFull: true,
        title: 'Autumn Mixer',
        organizer: 'Student Entertainment Board',
        time: '6:00 PM',
        location: 'Bellville Campus',
        image: null,
    },
    {
        id: 3,
        month: 'OCT',
        day: '28',
        category: 'Sports',
        spots: '5 spots left',
        spotsFull: false,
        title: 'Inter-Collegiate Soccer Trials',
        organizer: 'Campus Athletics Dept.',
        time: '4:30 PM',
        location: 'Bellville Campus',
        image: null,
    },
    {
        id: 4,
        month: 'NOV',
        day: '02',
        category: 'Workshop',
        spots: '8 spots left',
        spotsFull: false,
        title: 'Hand-Built Pottery Workshop',
        organizer: 'Fine Arts Society',
        time: '11:00 AM',
        location: 'District Six Art Annex',
        image: null,
    },
    {
        id: 5,
        month: 'NOV',
        day: '05',
        category: 'Academic',
        spots: 'Limited',
        spotsFull: false,
        title: 'AI & Ethics Debate Night',
        organizer: 'Philosophy & Computing Club',
        time: '6:30 PM',
        location: 'District Six Campus Library Hall',
        image: null,
    },
    {
        id: 6,
        month: 'NOV',
        day: '08',
        category: 'Social',
        spots: 'Unlimited',
        spotsFull: false,
        title: 'Weekly Campus Green Market',
        organizer: 'Sustainability Alliance',
        time: '10:00 AM',
        location: 'Mowbray Campus',
        image: null,
    },
];

const categoryColours: Record<string, string> = {
    Academic: 'bg-orange-100 text-orange-600',
    Social: 'bg-blue-100 text-blue-600',
    Sports: 'bg-yellow-100 text-yellow-700',
    Workshop: 'bg-green-100 text-green-700',
};

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex min-h-screen bg-app font-brand overflow-x-hidden">

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-ui-border flex flex-col z-30 transform transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="p-6 border-b border-ui-border flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-primary">Campus Connect</span>
                    <button onClick={() => setSidebarOpen(false)}>
                        <X className="h-5 w-5 text-muted" />
                    </button>
                </div>
                <nav className="flex-1 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Menu</p>
                    <ul className="space-y-1">
                        {['Explore', 'My RSVPs', 'Clubs'].map((item) => (
                            <li key={item}>
                                <a href="#" className="block px-3 py-2 rounded-lg text-sm text-brand-primary hover:bg-app transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3 mt-6">Me</p>
                    <ul className="space-y-1">
                        {['Settings', 'Account'].map((item) => (
                            <li key={item}>
                                <a href="#" className="block px-3 py-2 rounded-lg text-sm text-brand-primary hover:bg-app transition-colors">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-ui-border">
                    <button className="text-sm text-red-400 hover:text-red-500 transition-colors">Log Out</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen">

                {/* Topbar */}
                <header className="bg-card border-b border-ui-border px-6 py-3 flex items-center gap-6 sticky top-0 z-10">
                    <button onClick={() => setSidebarOpen(true)} className="text-brand-primary">
                        <Menu className="h-5 w-5" />
                    </button>
                    <span className="text-base font-extrabold text-brand-primary">Campus Connect</span>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-6 ml-2">
                        <a href="#" className="text-sm font-semibold text-brand-primary border-b-2 border-brand-primary pb-0.5">Explore</a>
                        <a href="#" className="text-sm font-medium text-muted hover:text-brand-primary transition-colors">My RSVPs</a>
                        <a href="#" className="text-sm font-medium text-muted hover:text-brand-primary transition-colors">Clubs</a>
                    </nav>

                    <div className="ml-auto flex items-center gap-4">
                        <button className="text-muted hover:text-brand-primary transition-colors">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button className="text-muted hover:text-brand-primary transition-colors">
                            <Calendar className="h-5 w-5" />
                        </button>
                        {/* TODO: replace initials with real user avatar image */}
                        <div className="h-9 w-9 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                            STU
                        </div>
                    </div>
                </header>

                {/* Search Bar */}
                <div className="bg-card border-b border-ui-border px-6 py-4">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        <input
                            type="text"
                            placeholder="Search for academic lectures, social mixers, or sports trials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-ui-border bg-app pl-11 pr-4 py-3 text-sm text-brand-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Filter Row */}
                <div className="bg-card border-b border-ui-border px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ui-border text-sm text-brand-primary hover:bg-app transition-colors">
                            Category: All
                            <ChevronDown className="h-3.5 w-3.5 text-muted" />
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ui-border text-sm text-brand-primary hover:bg-app transition-colors">
                            Date: Anytime
                            <ChevronDown className="h-3.5 w-3.5 text-muted" />
                        </button>
                    </div>
                    <span className="text-sm font-semibold text-brand-primary">
                        24 upcoming events found
                    </span>
                </div>

                {/* Events Grid */}
                <div className="flex-1 px-6 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-card rounded-2xl border border-ui-border overflow-hidden flex flex-col shadow-subtle hover:shadow-md transition-shadow"
                            >
                                {/* Event Image */}
                                <div className="relative h-48 bg-neutral-200 overflow-hidden">
                                    {/* TODO: add real image here like:
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    */}

                                    {/* Date Badge */}
                                    <div className="absolute top-3 left-3 bg-white rounded-lg px-2.5 py-1.5 text-center shadow-sm min-w-[44px]">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-accent leading-none">{event.month}</p>
                                        <p className="text-lg font-extrabold text-brand-primary leading-tight">{event.day}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="flex flex-col flex-1 p-4 gap-3">

                                    {/* Category + Spots */}
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${categoryColours[event.category] ?? 'bg-gray-100 text-gray-600'}`}>
                                            {event.category}
                                        </span>
                                        <span className={`text-xs font-semibold flex items-center gap-1 ${event.spotsFull ? 'text-red-500' : 'text-muted'}`}>
                                            <Users className="h-3 w-3" />
                                            {event.spots}
                                        </span>
                                    </div>

                                    {/* Title + Organizer */}
                                    <div>
                                        <h3 className="text-base font-bold text-brand-primary leading-snug">{event.title}</h3>
                                        <p className="text-xs text-muted mt-0.5">{event.organizer}</p>
                                    </div>

                                    {/* Time + Location + Button */}
                                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-ui-border">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs text-muted flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {event.time}
                                            </span>
                                            <span className="text-xs text-muted flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {event.location}
                                            </span>
                                        </div>

                                        {event.spotsFull ? (
                                            <button className="px-4 py-2 rounded-lg border border-ui-border text-xs font-semibold text-muted cursor-default">
                                                Join Waitlist
                                            </button>
                                        ) : (
                                            <button className="px-4 py-2 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                                                Register
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-card border-t border-ui-border px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <span className="text-sm font-bold text-brand-primary">Campus Connect</span>
                    <div className="flex items-center gap-6 text-xs text-muted">
                        <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-brand-primary transition-colors">Campus Directory</a>
                    </div>
                    <span className="text-xs text-muted">© 2026 Campus Connect. All rights reserved.</span>
                </footer>

            </main>
        </div>
    );
}