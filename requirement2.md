# Functional Requirements: Thanhdao's Archive

## 1. System Overview
A static web application for personal content management deployable on GitHub Pages, featuring three distinct content sections: journal entries, blog posts, and professional work portfolio.

## 2. Technical Requirements

### 2.1 Deployment
- Static site generation compatible with GitHub Pages
- No server-side processing required
- All content stored as static files

### 2.2 Navigation
- Three main navigation tabs: "Journal", "Blog", "Work"
- Persistent navigation header across all pages
- Clear visual indication of active section

## 3. Functional Modules

### 3.1 Online Journal
**Purpose**: Casual life updates and daily thoughts

**Requirements**:
- Plain text entry support (no markdown required)
- Multi-image upload capability per post
- Automatic timestamp generation for each entry
- Reverse chronological ordering (newest first)
- Pagination system:
 - 10 posts maximum per page
 - Page navigation controls
- Post structure:
 - Date/time stamp
 - Text content
 - Optional image gallery (1+ images)

### 3.2 Blog Archive
**Purpose**: Long-form technical and life experience articles

**Requirements**:
- Homepage listing view:
 - Thumbnail image for each post
 - Post title
 - Publication date
 - Clickable cards linking to full post
- Individual post pages:
 - Full article content
 - Rich text formatting support
 - Back navigation to archive
- Chronological or categorical organization

### 3.3 Work Archive
**Purpose**: Professional research project showcase

**Requirements**:
- Project listing view:
 - Project thumbnail
 - Project title
 - Date/timeline
 - Brief description preview
- Individual project pages:
 - Detailed project information
 - Technical specifications
 - Results/outcomes
 - Related links/resources
- Structure identical to blog archive navigation

## 4. Content Management
- Static file-based content storage
- Manual content updates via git commits
- Image assets stored in dedicated directories
- Consistent file naming conventions

## 5. User Interface
- Responsive design for desktop/mobile
- Minimal, clean aesthetic
- Fast page load times
- No external dependencies for core functionality