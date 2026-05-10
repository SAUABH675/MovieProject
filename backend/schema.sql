-- ─────────────────────────────────────────
-- Movix  —  Database Schema
-- Run once:  mysql -u root -p movix < schema.sql
-- ─────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS movix
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE movix;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url    VARCHAR(255),
  created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- User genre preferences
CREATE TABLE IF NOT EXISTS user_genres (
  id      INT         AUTO_INCREMENT PRIMARY KEY,
  user_id INT         NOT NULL,
  genre   VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Contact-us messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(191) NOT NULL,
  subject    VARCHAR(200),
  message    TEXT         NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- About page — team members
CREATE TABLE IF NOT EXISTS team_members (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  role          VARCHAR(100),
  bio           TEXT,
  avatar_url    VARCHAR(255),
  display_order INT          DEFAULT 0
);

-- About page — features / highlights
CREATE TABLE IF NOT EXISTS features (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(100) NOT NULL,
  description   TEXT,
  icon          VARCHAR(50),
  display_order INT          DEFAULT 0
);
