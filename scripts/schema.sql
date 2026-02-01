-- 1. Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
    id BIGINT PRIMARY KEY,
    message TEXT NOT NULL,
    level TEXT,
    date DATE,
    is_past BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE,
    time TIME,
    location TEXT,
    description TEXT,
    category TEXT,
    recurring BOOLEAN DEFAULT FALSE,
    recurring_pattern TEXT,
    coordinates_lat DOUBLE PRECISION,
    coordinates_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. News Table
CREATE TABLE IF NOT EXISTS news (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    date DATE,
    category TEXT,
    author TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS services (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    address TEXT,
    phone TEXT,
    hours TEXT,
    emergency BOOLEAN DEFAULT FALSE,
    coordinates_lat DOUBLE PRECISION,
    coordinates_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Points of Interest Table
CREATE TABLE IF NOT EXISTS points_of_interest (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image TEXT,
    coordinates_lat DOUBLE PRECISION,
    coordinates_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    cuisine TEXT,
    description TEXT,
    image TEXT,
    address TEXT,
    phone TEXT,
    price_range TEXT,
    hours TEXT,
    specialties TEXT[],
    rating DOUBLE PRECISION,
    website TEXT,
    coordinates_lat DOUBLE PRECISION,
    coordinates_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Accommodations Table
CREATE TABLE IF NOT EXISTS accommodations (
    id BIGINT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    stars INTEGER,
    description TEXT,
    image TEXT,
    address TEXT,
    phone TEXT,
    price_range TEXT,
    amenities TEXT[],
    rating DOUBLE PRECISION,
    website TEXT,
    coordinates_lat DOUBLE PRECISION,
    coordinates_lng DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Market Items Table
CREATE TABLE IF NOT EXISTS market_items (
    id BIGINT PRIMARY KEY,
    title TEXT NOT NULL,
    price TEXT,
    category TEXT,
    image TEXT,
    seller_phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
