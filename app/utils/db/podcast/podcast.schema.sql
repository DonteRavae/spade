CREATE TABLE guest_requests (
    name VARCHAR(200) NOT NULL,
    occupation VARCHAR(200),
    contact_info VARCHAR(200) NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE topic_requests (
    topic TEXT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE podcast_episodes (
    id INT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    artwork_url TEXT NOT NULL,
    artist TEXT NOT NULL,
    season_number TINYINT,
    episode_number TINYINT
);