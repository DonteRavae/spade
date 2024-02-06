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
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    submitted_by VARCHAR(100)
);

CREATE TABLE comments(
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    content_type VARCHAR(10),
    parent_comment_id VARCHAR(100),
    parent_post_id VARCHAR(100) NOT NULL,
    submitted_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_post_id) REFERENCES forum_posts(id) ON DELETE CASCADE
);

CREATE TABLE votes (
    id VARCHAR(100) PRIMARY KEY NOT NULL,
    parent_id VARCHAR(100) NOT NULL,
    vote TINYINT DEFAULT 0,
    voter VARCHAR(100) NOT NULL,
    FOREIGN KEY (voter) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    parent_id VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

-- Retrieve all comments Query
-- WITH RECURSIVE ForumPostComments AS (
--     -- Anchor Member Definition
--     SELECT 
--     -- Recursive Member Definition
-- ) 
-- -- Statement to execute CTE
-- SELECT * FROM ForumPostComments;