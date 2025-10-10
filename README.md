# Portfolio Site

A modern portfolio website built with Next.js and deployed on GitHub Pages.

## 🚀 Deployment Setup

### Prerequisites
- GitHub account
- Node.js 18+ installed locally

### Quick Setup for GitHub Pages

1. **Fork/Clone this repository** to your GitHub account

2. **Update Configuration**:
   - Replace `USERNAME` in `package.json` homepage field with your GitHub username
   - Replace `REPOSITORY_NAME` in both `package.json` and `next.config.mjs` with your repository name

3. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Set Source to "GitHub Actions"

4. **Push to main branch** - GitHub Actions will automatically build and deploy your site

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to see your site locally.

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
npm run deploy
```

## 📁 Project Structure

```
├── app/          # Next.js app directory
├── components/   # Reusable React components
├── content/      # Content files
├── public/       # Static assets
├── styles/       # Global styles
└── out/          # Built static files (generated)
```

## 🛠 Technologies

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages
- **Build Tool**: GitHub Actions

## 📝 Customization

1. Update content in the `content/` directory
2. Modify components in the `components/` directory
3. Customize styling in `tailwind.config.ts`
4. Add new pages in the `app/` directory

## 🔧 Configuration Files

- `next.config.mjs` - Next.js configuration for static export
- `tailwind.config.ts` - Tailwind CSS configuration
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `package.json` - Dependencies and scripts

## 📄 License

This project is open source and available under the [MIT License](LICENSE).