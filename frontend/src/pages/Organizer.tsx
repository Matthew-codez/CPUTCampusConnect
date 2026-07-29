import { useState } from 'react';
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    Settings,
    HelpCircle,
    Bell,
    UserCircle,
    Search,
    Plus,
    TrendingUp,
    Calendar,
    GraduationCap,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
} from 'lucide-react';

type EventStatus = 'PUBLISHED' | 'DRAFT';

interface OrgEvent {
    id: number;
    title: string;
    location: string;
    date: string;
    status: EventStatus;
    rsvps: number | null;
    capacity: number | null;
    // TODO: replace with real image → src={event.image}
    image: null;
}

const myEvents: OrgEvent[] = [
    {
        id: 1,
        title: 'Introduction to Python Workshop',
        location: 'Computer Science Building, Lab 4',
        date: 'Oct 12, 2026',
        status: 'PUBLISHED',
        rsvps: 45,
        capacity: 100,
        image: null,
    },
    {
        id: 2,
        title: 'Winter Hackathon 2024',
        location: 'Engineering Atrium',
        date: 'Dec 05, 2026',
        status: 'DRAFT',
        rsvps: null,
        capacity: null,
        image: null,
    },
    {
        id: 3,
        title: 'Global Tech Networking',
        location: 'Main Plaza',
        date: 'Oct 28, 2026',
        status: 'PUBLISHED',
        rsvps: 192,
        capacity: 200,
        image: null,
    },
];

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'My Events', icon: CalendarDays },
    { label: 'Attendee Lists', icon: Users },
];

const bottomNav = [
    { label: 'Settings', icon: Settings },
    { label: 'Support', icon: HelpCircle },
];

function CapacityBar({ rsvps, capacity }: { rsvps: number; capacity: number }) {
    const pct = Math.round((rsvps / capacity) * 100);
    const barColour = pct >= 90 ? 'bg-brand-accent' : 'bg-brand-primary';
    return (
        <div className="flex items-center gap-2 min-w-[140px]">
            <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColour}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-semibold text-muted whitespace-nowrap">
                {rsvps} / {capacity} &nbsp; {pct}%
            </span>
        </div>
    );
}

export default function Organizer() {
    const [activeNav, setActiveNav] = useState('Dashboard');
    const [search, setSearch] = useState('');

    return (
        <div className="flex min-h-screen bg-app font-brand">

            {/* ── Sidebar ── */}
            <aside className="w-56 flex-shrink-0 bg-card border-r border-ui-border flex flex-col">

                {/* Profile */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-ui-border">
                    {/* Default avatar circle */}
                    <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                        <UserCircle className="h-7 w-7 text-muted" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-brand-primary truncate">Organizer 1</p>
                        <p className="text-xs text-muted">Event Manager</p>
                    </div>
                </div>

                {/* Main Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    {navItems.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => setActiveNav(label)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                activeNav === label
                                    ? 'bg-app text-brand-primary border-l-2 border-brand-primary'
                                    : 'text-muted hover:bg-app hover:text-brand-primary'
                            }`}
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {label}
                        </button>
                    ))}
                </nav>

                {/* Bottom Nav */}
                <div className="px-3 py-4 border-t border-ui-border space-y-0.5">
                    {bottomNav.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-app hover:text-brand-primary transition-colors"
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {label}
                        </button>
                    ))}
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">

                {/* Topbar */}
                <header className="bg-card border-b border-ui-border px-6 py-3 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        <input
                            type="text"
                            placeholder="Search events or attendees..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-ui-border bg-app pl-9 pr-4 py-2 text-sm text-brand-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                        />
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                        <button className="text-muted hover:text-brand-primary transition-colors">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button className="text-muted hover:text-brand-primary transition-colors">
                            <UserCircle className="h-5 w-5" />
                        </button>
                    </div>
                </header>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">

                    {/* Welcome + CTA */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-brand-primary">Welcome back, Tech Club</h1>
                            <p className="text-sm text-muted mt-1">Manage your campus activities and monitor engagement.</p>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-subtle">
                            <Plus className="h-4 w-4" />
                            Create New Event
                        </button>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-3 gap-5">

                        {/* Total RSVPs */}
                        <div className="bg-card rounded-2xl border border-ui-border p-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Total RSVPs</p>
                            <p className="text-4xl font-extrabold text-brand-primary">367</p>
                            <p className="text-xs text-green-500 font-semibold mt-1 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                12% from last month
                            </p>
                        </div>

                        {/* Active Events */}
                        <div className="bg-card rounded-2xl border border-ui-border p-5">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Active Events</p>
                            <p className="text-4xl font-extrabold text-brand-primary">08</p>
                            <p className="text-xs text-blue-500 font-semibold mt-1 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                3 scheduled this week
                            </p>
                        </div>

                        {/* Next Featured Event */}
                        <div className="rounded-2xl p-5 flex flex-col justify-between" style={{ background: '#3D1F00' }}>
                            <p className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2">Next Featured Event</p>
                            <div>
                                <p className="text-lg font-extrabold text-white leading-snug">AI in Modern Ethics Symposium</p>
                                <p className="text-xs text-neutral-300 mt-1 flex items-center gap-1">
                                    <GraduationCap className="h-3 w-3" />
                                    Oct 24 · Great Hall Auditorium
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events Table */}
                    <div className="bg-card rounded-2xl border border-ui-border overflow-hidden">

                        {/* Table Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-ui-border">
                            <h2 className="text-base font-bold text-brand-primary">Upcoming Events</h2>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 rounded-lg border border-ui-border text-xs font-semibold text-brand-primary hover:bg-app transition-colors">
                                    All Status
                                </button>
                                <button className="px-3 py-1.5 rounded-lg border border-ui-border text-xs font-semibold text-brand-primary hover:bg-app transition-colors">
                                    Export CSV
                                </button>
                            </div>
                        </div>

                        {/* Column Labels */}
                        <div className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr] gap-4 px-6 py-3 border-b border-ui-border">
                            {['Event Title', 'Date', 'Status', 'RSVPs', 'Actions'].map((col) => (
                                <span key={col} className="text-xs font-bold uppercase tracking-wider text-muted">{col}</span>
                            ))}
                        </div>

                        {/* Rows */}
                        <ul className="divide-y divide-ui-border">
                            {myEvents.map((event) => (
                                <li key={event.id} className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr] gap-4 items-center px-6 py-4 hover:bg-app transition-colors">

                                    {/* Event Title + Image placeholder */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        {/* TODO: replace with <img src={event.image} className="h-10 w-10 rounded-lg object-cover flex-shrink-0" /> */}
                                        <div className="h-10 w-10 rounded-lg bg-neutral-100 border border-ui-border flex items-center justify-center flex-shrink-0">
                                            <ImageIcon className="h-5 w-5 text-muted" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-brand-primary truncate">{event.title}</p>
                                            <p className="text-xs text-muted truncate">{event.location}</p>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <span className="text-sm text-brand-primary">{event.date}</span>

                                    {/* Status */}
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                        event.status === 'PUBLISHED' ? 'text-green-600' : 'text-muted'
                                    }`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${
                                            event.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-neutral-400'
                                        }`} />
                                        {event.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                                    </span>

                                    {/* RSVPs + capacity bar */}
                                    <div>
                                        {event.rsvps !== null && event.capacity !== null ? (
                                            <CapacityBar rsvps={event.rsvps} capacity={event.capacity} />
                                        ) : (
                                            <span className="text-xs text-muted">No capacity set</span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button className="p-1.5 rounded-md border border-ui-border text-muted hover:text-brand-primary hover:border-brand-primary transition-colors">
                                            <Pencil className="h-3.5 w-3.5" />
                                        </button>
                                        <button className="p-1.5 rounded-md border border-red-200 text-red-400 hover:text-red-600 hover:border-red-400 transition-colors">
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-ui-border">
                            <span className="text-xs text-muted">Showing 3 of 8 events</span>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 rounded-lg border border-ui-border text-muted hover:bg-app transition-colors">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-semibold">1</button>
                                <button className="px-3 py-1.5 rounded-lg border border-ui-border text-xs font-semibold text-muted hover:bg-app transition-colors">2</button>
                                <button className="p-1.5 rounded-lg border border-ui-border text-muted hover:bg-app transition-colors">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-2 gap-5 pb-8">

                        {/* Pending Tasks */}
                        <div className="bg-card rounded-2xl border border-ui-border p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-brand-primary flex items-center justify-center">
                                    <CalendarDays className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="text-base font-bold text-brand-primary">Pending Tasks</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    { task: 'Review speaker bios', sub: 'Tech Ethics Symposium' },
                                    { task: 'Confirm venue booking', sub: 'Winter Hackathon 2024' },
                                    { task: 'Send attendee reminders', sub: 'Python Workshop' },
                                ].map((t) => (
                                    <li key={t.task} className="flex items-start gap-2">
                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-accent flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-brand-primary">{t.task}</p>
                                            <p className="text-xs text-muted">{t.sub}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Organizer Insights */}
                        <div className="bg-card rounded-2xl border border-ui-border p-6">
                            <h3 className="text-base font-bold text-brand-primary mb-2">Organizer Insights</h3>
                            <p className="text-sm text-muted mb-6">
                                Based on your recent events, engagement peaks around 3 PM on Tuesdays. Consider scheduling your next registration launch then.
                            </p>
                            {/* Simple bar chart placeholder */}
                            <div className="flex items-end gap-2 h-16">
                                {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                                    <div
                                        key={i}
                                        className="flex-1 rounded-t"
                                        style={{
                                            height: `${h}%`,
                                            background: i === 5 ? 'var(--color-brand-accent)' : 'var(--color-brand-primary)',
                                            opacity: i === 5 ? 1 : 0.15,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}