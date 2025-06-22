# 🧩 Next.js Dashboard Template

A modern and clean admin dashboard template built with **Next.js App Router** and **Tailwind CSS**.  
Designed with reusable layout structure, sidebar component, and dark mode support.

## 🚀 Getting Started

### 1. Clone this repository
```bash
git clone https://github.com/lewyinn/nextjs-dashboard-template.git
cd nextjs-dashboard-template
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Folder Structure

```bash
src/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   ├── layout.js
│   │   │   └── page.js
│   │   └── users/
│   │       ├── create/
│   │       │   └── page.js
│   │       ├── layout.js
│   │       └── page.js
│   ├── signup/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   └── page.js
├── components/
│   └── Sidebar.js
├── context/
│   └── SidebarContext.js
```

- `app/`: Contains routing, layouts, and pages (App Router).
- `components/`: Reusable UI components like Sidebar.
- `context/`: Global state using React Context.

---

## 💡 Notes

- Tailwind CSS is used for styling.
- Dark mode toggle is implemented.
- File-based routing with layouts per route.

---

Enjoy building your dashboard! 🚧