CREATE TABLE profiles (
    id VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    avatar_url VARCHAR(350) NOT NULL
);

CREATE TABLE forum_posts (
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    title VARCHAR(300) NOT NULL,
    content_type VARCHAR(10),
    content TEXT,
    flair VARCHAR(50) NOT NULL,
    votes INT DEFAULT 1,
    favorite BOOLEAN DEFAULT FALSE,
    favorite_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    submitted_by VARCHAR(100)
);

CREATE TABLE comments(
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    content TEXT,
    votes INT DEFAULT 1,
    parent_comment VARCHAR(100),
    parent_post VARCHAR(100) NOT NULL,
    submitted_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_post) REFERENCES forum_posts(id) ON DELETE CASCADE
);

-- Retrieve all comments Query
-- WITH RECURSIVE ForumPostComments AS (
--     -- Anchor Member Definition
--     SELECT 
--     -- Recursive Member Definition
-- ) 
-- -- Statement to execute CTE
-- SELECT * FROM ForumPostComments;