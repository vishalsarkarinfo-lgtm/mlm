# ApexMLM | Enterprise MLM & Referral Network Platform

ApexMLM is a next-generation professional Multi-Level Marketing (MLM) platform built with React, TypeScript, Tailwind CSS, and Recharts, configured for seamless, zero-cost static hosting on **GitHub Pages**.

---

## Features

1. **Public Website**: Home, About Us, Business Plan, Products / Services, How It Works, Contact Us, Login, Member Registration, and Legal compliance pages (Terms, Privacy, Refund, Income Disclaimer).
2. **Member Dashboard**: Real-time stats, wallet balance, income history, team network, interactive genealogy tree, commission ledger, withdrawal requests, KYC verification, and support tickets.
3. **Unilevel MLM Referral System**: Unique referral IDs, links, parent-child downline tracking, and unilevel depth configuration.
4. **Commission Engine**: Multi-tier commission calculation based on verified product and service sales (BV).
5. **Wallet System**: Secure deposit/credit records, withdrawal requests, and immutable transaction ledger.
6. **Admin Dashboard**: Comprehensive command center for member management, MLM plan configuration, commission audits, withdrawal approvals, KYC verification, and security audit logs.

---

## GitHub Pages Deployment Instructions

This repository is fully configured for automated deployment to GitHub Pages using **GitHub Actions**.

### Step 1: Push to GitHub
1. Create a new repository on GitHub (e.g. `apex-mlm`).
2. Push your code to the `main` branch:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/apex-mlm.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Configure GitHub Pages Settings
1. Go to your GitHub repository **Settings** -> **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the Source.

### Step 3: Automated Deployment
Whenever you push updates to `main`, the GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically install dependencies, build the static Next.js application (`npm run build`), and deploy the `out` directory to GitHub Pages.

---

## Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
