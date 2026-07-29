import { useState } from 'react';
import {
    UserCircle,
    Plus,
    LayoutDashboard,
    CalendarDays,
    Users,
    BookOpen,
    HelpCircle,
    Bell,
    Search,
    ChevronDown,
    FileImage,
    Bold,
    Italic,
    List,
    Link,
    Calendar,
    Building2,
} from 'lucide-react';

const navItems = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'My Events', icon: CalendarDays },
    { label: 'Attendees', icon: Users },
    { label: 'Resources', icon: BookOpen },
];

export default function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [campus, setCampus] = useState('');
    const [venue, setVenue] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [capacity, setCapacity] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [activeNav, setActiveNav] = useState('My Events');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = () => {
        // TODO: call API to publish event
        console.log({ title, description, date, campus, venue, startTime, endTime, capacity });
    };

    return (
        <div className="flex min-h-screen bg-app font-brand">

            {/* Sidebar */}
            <aside className="w-56 flex-shrink-0 bg-card border-r border-ui-border flex flex-col">
                <div className="px-5 py-5 border-b border-ui-border">
                    <div className="flex items-center gap-3 mb-4">
                        {/* TODO: replace with real avatar image */}
                        <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                            <UserCircle className="h-7 w-7 text-muted" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-brand-primary truncate">Organizer Portal</p>
                            <p className="text-xs text-muted">Academic Administration</p>
                        </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                        <Plus className="h-3.5 w-3.5" />
                        Create New Event
                    </button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    {navItems.map(({ label, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => setActiveNav(label)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                activeNav === label
                                    ? 'bg-app text-brand-primary border-l-2 border-brand-primary'
                                    : 'text-muted hover:bg-app hover:text-brand-primary border-l-2 border-transparent'
                            }`}
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="px-3 py-4 border-t border-ui-border">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:bg-app hover:text-brand-primary transition-colors">
                        <HelpCircle className="h-4 w-4" />
                        Help Center
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 flex flex-col min-h-screen">

                {/* Topbar */}
                <header className="bg-card border-b border-ui-border px-6 py-3 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                        <input
                            type="text"
                            placeholder="Search events or attendees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-muted mb-5">
                        <span className="hover:text-brand-primary cursor-pointer transition-colors">My Events</span>
                        <ChevronDown className="h-3 w-3 -rotate-90" />
                        <span className="font-semibold text-brand-primary">Create New Event</span>
                    </div>

                    <div className="bg-card rounded-2xl border border-ui-border overflow-hidden max-w-3xl">

                        {/* Hero */}
                        <div className="px-8 py-8" style={{ background: 'linear-gradient(135deg, #0A2240 0%, #0f3460 100%)' }}>
                            <h1 className="text-2xl font-extrabold text-white mb-1">Create New Event</h1>
                            <p className="text-sm" style={{ color: '#93b4d4' }}>
                                Fill in the scholarly details for your upcoming campus gathering.
                            </p>
                        </div>

                        <div className="px-8 py-8 space-y-10">

                            {/* Event Details */}
                            <section className="space-y-5">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: '#fff3e0' }}>
                                        <CalendarDays className="h-4 w-4 text-brand-accent" />
                                    </div>
                                    <h2 className="text-base font-bold text-brand-primary">Event Details</h2>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-brand-primary">
                                        Event Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., AI & Ethics Debate Night"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full rounded-lg border border-ui-border bg-app px-4 py-3 text-sm text-brand-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-brand-primary">Description</label>
                                    <div className="rounded-lg border border-ui-border overflow-hidden">
                                        <div className="flex items-center gap-1 px-3 py-2 border-b border-ui-border bg-card">
                                            {[Bold, Italic, List, Link].map((Icon, i) => (
                                                <button key={i} type="button" className="p-1.5 rounded hover:bg-app transition-colors text-muted hover:text-brand-primary">
                                                    <Icon className="h-3.5 w-3.5" />
                                                </button>
                                            ))}
                                        </div>
                                        <textarea
                                            rows={6}
                                            placeholder="Provide a detailed overview of the event's goals and speaker profiles..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full px-4 py-3 text-sm text-brand-primary placeholder:text-muted bg-app focus:outline-none resize-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Logistics */}
                            <section className="space-y-5">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: '#e8f0fe' }}>
                                        <Calendar className="h-4 w-4" style={{ color: '#3b5fc0' }} />
                                    </div>
                                    <h2 className="text-base font-bold text-brand-primary">Logistics</h2>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-brand-primary">
                                            Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full rounded-lg border border-ui-border bg-app px-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-brand-primary">
                                            Campus <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={campus}
                                                onChange={(e) => setCampus(e.target.value)}
                                                className="w-full appearance-none rounded-lg border border-ui-border bg-app px-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                                            >
                                                <option value="">Select Campus (e.g., District Six)</option>
                                                <option value="district-six">District Six Campus</option>
                                                <option value="bellville">Bellville Campus</option>
                                                <option value="mowbray">Mowbray Campus</option>
                                                <option value="granger-bay">Granger Bay Campus</option>
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-brand-primary">
                                            Venue / Room Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Auditorium B, Level 4"
                                            value={venue}
                                            onChange={(e) => setVenue(e.target.value)}
                                            className="w-full rounded-lg border border-ui-border bg-app px-4 py-3 text-sm text-brand-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-brand-primary">
                                            Start Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-full rounded-lg border border-ui-border bg-app px-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-brand-primary">
                                            End Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-full rounded-lg border border-ui-border bg-app px-4 py-3 text-sm text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Capacity */}
                            <section className="space-y-5">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: '#e8f5e9' }}>
                                        <Users className="h-4 w-4" style={{ color: '#2e7d32' }} />
                                    </div>
                                    <h2 className="text-base font-bold text-brand-primary">Capacity</h2>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-brand-primary">
                                        Maximum Capacity <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative w-48">
                                        <input
                                            type="number"
                                            placeholder="50"
                                            value={capacity}
                                            onChange={(e) => setCapacity(e.target.value)}
                                            className="w-full rounded-lg border border-ui-border bg-app pl-4 pr-16 py-3 text-sm text-brand-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
                                        />
                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted uppercase tracking-wider">
                                            Seats
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Media Content */}
                            <section className="space-y-5">
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: '#f3e5f5' }}>
                                        <Building2 className="h-4 w-4" style={{ color: '#7b1fa2' }} />
                                    </div>
                                    <h2 className="text-base font-bold text-brand-primary">Media Content</h2>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-brand-primary">Upload Event Banner Image</label>
                                    <label
                                        className={`block cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
                                            isDragging ? 'border-brand-primary bg-blue-50' : 'border-ui-border bg-app hover:border-brand-primary'
                                        }`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                    >
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        <div className="flex flex-col items-center justify-center py-12">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Banner preview" className="max-h-48 rounded-lg object-cover" />
                                            ) : (
                                                <>
                                                    <FileImage className="h-10 w-10 text-muted mb-3" />
                                                    <p className="text-sm font-semibold text-brand-primary">Click or drag to upload</p>
                                                    <p className="text-xs text-muted mt-1">Recommended size: 1200×480px (JPEG, PNG or WebP)</p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </section>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-ui-border">
                                <button
                                    type="button"
                                    className="px-6 py-3 rounded-xl border border-ui-border text-sm font-semibold text-brand-primary hover:bg-app transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handlePublish}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Publish Event ›
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-card border-t border-ui-border px-8 py-4 flex items-center justify-between">
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
