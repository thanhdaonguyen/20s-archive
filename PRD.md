<PRD>

# Product Requirements Document: Thanhdao's Archive

## 1. Introduction

This Product Requirements Document (PRD) outlines the specifications for Thanhdao's Archive, a personal static web application designed for content management and professional showcase. The document serves as a comprehensive guide for the development, implementation, and deployment of a GitHub Pages-compatible website that combines personal journaling, technical blogging, and professional portfolio features. This PRD defines the functional requirements, technical specifications, user interactions, and design principles necessary to deliver a cohesive and efficient personal web presence.

## 2. Product overview

Thanhdao's Archive is a lightweight, static website application that provides a unified platform for personal expression and professional presentation. The application consists of three core modules: an online journal for casual daily updates, a blog archive for in-depth technical and life experience articles, and a work archive for showcasing research projects and professional accomplishments. Built specifically for deployment on GitHub Pages, the application requires no server-side processing and relies entirely on static file generation, ensuring optimal performance, minimal maintenance, and cost-effective hosting.

## 3. Goals and objectives

### 3.1 Primary goals
- Create a centralized platform for personal and professional content management
- Provide a seamless, static website experience deployable on GitHub Pages
- Establish a maintainable system for content organization and presentation
- Deliver fast, responsive user experience across all devices

### 3.2 Specific objectives
- Enable effortless journaling with support for text and multiple images
- Facilitate professional blogging with rich formatting capabilities
- Showcase research work and projects in an organized, accessible manner
- Implement efficient pagination and navigation systems
- Maintain site performance with minimal external dependencies
- Ensure content versioning through Git-based workflow

### 3.3 Success metrics
- Page load time under 2 seconds on standard broadband connection
- Mobile responsiveness score above 95 on Google PageSpeed Insights
- Zero server-side dependencies for core functionality
- Support for unlimited content entries across all sections
- Successful deployment and updates via GitHub Pages workflow

## 4. Target audience

### 4.1 Primary user
- **Thanhdao (Site Owner)**: A researcher and technical professional requiring a personal platform to share life updates, technical insights, and professional work. Comfortable with Git workflows and basic web technologies.

### 4.2 Secondary audience
- **Professional contacts**: Colleagues, potential employers, and collaborators viewing the work archive and technical blog posts
- **Personal connections**: Friends and family accessing journal entries and life updates
- **Technical community**: Developers and researchers reading technical blog posts and project documentation
- **General visitors**: Individuals discovering content through search engines or social media shares

### 4.3 User characteristics
- Technical proficiency ranges from basic internet users to advanced developers
- Access the site primarily for reading and content consumption
- Expect fast loading times and clean, readable interfaces
- Value content organization and easy navigation

## 5. Features and requirements

### 5.1 Core features

#### 5.1.1 Navigation system
- Persistent header with three main tabs: "Journal", "Blog", "Work"
- Active section highlighting
- Mobile-responsive navigation menu
- Consistent placement across all pages

#### 5.1.2 Online journal module
- Plain text content entry
- Multi-image support per post
- Automatic timestamp generation
- Reverse chronological display
- Pagination (10 posts per page)
- Image gallery functionality

#### 5.1.3 Blog archive module
- Card-based listing view with thumbnails
- Individual post pages with rich formatting
- Chronological organization
- Back navigation to archive
- Support for technical content and code snippets

#### 5.1.4 Work archive module
- Project showcase with thumbnails
- Detailed project pages
- Technical specification sections
- External link integration
- Similar navigation structure to blog archive

### 5.2 Content management features
- Git-based content versioning
- Static file storage system
- Organized directory structure for assets
- Markdown or HTML content support
- Image optimization for web delivery

### 5.3 Technical features
- Static site generation
- No database requirements
- Client-side only functionality
- GitHub Pages deployment compatibility
- Responsive CSS framework

## 6. User stories and acceptance criteria

### 6.1 Navigation and access

**ST-101: As Thanhdao, I want to navigate between journal, blog, and work sections**
- **Given** I am on any page of the website
- **When** I click on a navigation tab
- **Then** I should be taken to the corresponding section homepage
- **And** the active tab should be visually highlighted

**ST-102: As a visitor, I want to access the website from any device**
- **Given** I have the website URL
- **When** I access it from desktop, tablet, or mobile
- **Then** the site should display properly with responsive design
- **And** all navigation elements should be accessible

### 6.2 Journal functionality

**ST-201: As Thanhdao, I want to create a new journal entry**
- **Given** I have access to the site files
- **When** I create a new journal entry file with text and images
- **Then** it should appear at the top of the journal page after deployment
- **And** display with correct timestamp

**ST-202: As Thanhdao, I want to add multiple images to a journal post**
- **Given** I am creating a journal entry
- **When** I reference multiple image files
- **Then** all images should display in the post
- **And** maintain proper aspect ratios

**ST-203: As a visitor, I want to browse through journal entries**
- **Given** there are more than 10 journal entries
- **When** I reach the bottom of the page
- **Then** I should see pagination controls
- **And** be able to navigate to older entries

**ST-204: As a visitor, I want to view journal entries in chronological order**
- **Given** I am on the journal page
- **When** I view the entries
- **Then** the newest entry should appear first
- **And** older entries should follow in descending order

### 6.3 Blog archive functionality

**ST-301: As Thanhdao, I want to publish a technical blog post**
- **Given** I have written a blog post with formatting
- **When** I add it to the blog directory and deploy
- **Then** it should appear in the blog archive listing
- **And** be accessible via its own URL

**ST-302: As a visitor, I want to browse blog posts**
- **Given** I am on the blog archive page
- **When** I view the listing
- **Then** I should see post thumbnails, titles, and dates
- **And** be able to click through to full posts

**ST-303: As a visitor, I want to read a full blog post**
- **Given** I clicked on a blog post from the archive
- **When** the post page loads
- **Then** I should see the full formatted content
- **And** have a way to return to the archive

**ST-304: As Thanhdao, I want to format blog posts with rich content**
- **Given** I am writing a blog post
- **When** I use markdown or HTML formatting
- **Then** the post should render with proper headings, code blocks, and styling
- **And** maintain readability

### 6.4 Work archive functionality

**ST-401: As Thanhdao, I want to showcase a research project**
- **Given** I have project details and assets
- **When** I create a project entry in the work archive
- **Then** it should display in the work listing
- **And** link to a detailed project page

**ST-402: As a visitor, I want to explore professional projects**
- **Given** I am on the work archive page
- **When** I browse the projects
- **Then** I should see project thumbnails and summaries
- **And** be able to access full project details

**ST-403: As a visitor, I want to view project specifications**
- **Given** I am on a project detail page
- **When** I read through the content
- **Then** I should see technical specifications, results, and outcomes
- **And** have access to related external links

### 6.5 Content management

**ST-501: As Thanhdao, I want to update content via Git**
- **Given** I have made changes to content files
- **When** I commit and push to GitHub
- **Then** GitHub Pages should automatically deploy updates
- **And** changes should be visible on the live site

**ST-502: As Thanhdao, I want to organize assets efficiently**
- **Given** I have images and other assets
- **When** I add them to the project
- **Then** they should follow the established directory structure
- **And** use consistent naming conventions

### 6.6 Performance and accessibility

**ST-601: As a visitor, I want fast page load times**
- **Given** I navigate to any page
- **When** the page loads
- **Then** it should be fully rendered within 2 seconds
- **And** images should load progressively

**ST-602: As a visitor, I want to access content without JavaScript**
- **Given** I have JavaScript disabled
- **When** I browse the site
- **Then** all content should be accessible
- **And** navigation should remain functional

## 7. Technical requirements / stack

### 7.1 Frontend technologies
- **HTML5**: Semantic markup for content structure
- **CSS3**: Styling with responsive design principles
- **JavaScript (Optional)**: Progressive enhancement only
- **Static Site Generator**: Jekyll (GitHub Pages default) or similar

### 7.2 Development tools
- **Version Control**: Git and GitHub
- **Deployment**: GitHub Pages
- **Build Process**: Jekyll or compatible static site generator
- **Asset Processing**: Image optimization tools

### 7.3 Infrastructure requirements
- **Hosting**: GitHub Pages (free tier)
- **Domain**: Optional custom domain via GitHub Pages
- **CDN**: GitHub's built-in CDN
- **SSL**: Provided by GitHub Pages

### 7.4 File structure
```
/
├── index.html (homepage/redirect)
├── journal/
│   ├── index.html
│   └── entries/
├── blog/
│   ├── index.html
│   └── posts/
├── work/
│   ├── index.html
│   └── projects/
├── assets/
│   ├── css/
│   ├── images/
│   └── js/ (optional)
└── _config.yml (if using Jekyll)
```

## 8. Design and user interface

### 8.1 Design principles
- **Minimalist**: Clean, uncluttered interface focusing on content
- **Readable**: Optimal typography and spacing for long-form reading
- **Consistent**: Unified design language across all sections
- **Accessible**: WCAG 2.1 AA compliance for accessibility

### 8.2 Layout specifications

#### 8.2.1 Header/navigation
- Fixed or sticky positioning
- Logo/site title on the left
- Navigation tabs centered
- Mobile hamburger menu for small screens

#### 8.2.2 Content areas
- Maximum content width: 800px for readability
- Centered content with comfortable margins
- Consistent padding and spacing
- Card-based layouts for archive listings

#### 8.2.3 Typography
- System font stack for fast loading
- Base font size: 16px minimum
- Line height: 1.5-1.7 for body text
- Clear heading hierarchy (h1-h6)

### 8.3 Component specifications

#### 8.3.1 Journal post component
- Date/timestamp prominently displayed
- Text content with preserved line breaks
- Image gallery with lightbox functionality (optional)
- Subtle post separators

#### 8.3.2 Blog/work card component
- Thumbnail image (16:9 aspect ratio)
- Title with hover effects
- Date and reading time (optional)
- Brief excerpt or description
- Click area covering entire card

#### 8.3.3 Pagination component
- Previous/Next buttons
- Page numbers (when applicable)
- Current page indicator
- Consistent positioning across sections

### 8.4 Responsive breakpoints
- Mobile: 320px - 768px
- Tablet: 769px - 1024px
- Desktop: 1025px and above

### 8.5 Color scheme
- Primary: Professional neutral (developer's choice)
- Secondary: Accent color for links and highlights
- Background: Light with dark text (or dark mode option)
- Sufficient contrast ratios for accessibility

### 8.6 Interaction patterns
- Hover states for all interactive elements
- Smooth transitions (CSS-based)
- Clear focus indicators for keyboard navigation
- Touch-friendly tap targets (minimum 44x44px)

</PRD>