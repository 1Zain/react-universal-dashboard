# Universal Dashboard

A modern, responsive, and highly customizable dashboard application built with React, TypeScript, and Tailwind CSS. This project provides a solid foundation for building enterprise-grade dashboard applications with a comprehensive set of reusable components and features.

## 🚀 Features

### Core Features
- **Modern UI/UX**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark/Light Theme**: Built-in theme switching with system preference detection
- **Authentication**: Secure login system with role-based access control
- **Real-time Updates**: Live data updates and notifications
- **Internationalization Ready**: Prepared for multi-language support

### Dashboard Pages
- **Dashboard**: Overview with key metrics, recent activities, and quick actions
- **Analytics**: Comprehensive analytics with charts and data visualization
- **Users**: User management with advanced filtering and search
- **Settings**: System configuration and preferences
- **Reports**: Report generation and management
- **System**: System monitoring and health checks
- **Notifications**: Centralized notification management

### Reusable Components
- **StatsCard**: Display key metrics with trends and icons
- **DataTable**: Advanced data table with sorting, filtering, and pagination
- **ChartCard**: Flexible chart component for data visualization
- **ActivityFeed**: Real-time activity feed with user avatars and metadata
- **DashboardCard**: Generic dashboard card component

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Query for server state
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: Sonner

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd universal-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Authentication

The application includes a demo authentication system with the following credentials:

- **Email**: `admin@company.com`
- **Password**: `admin123`

## 📁 Project Structure

```
src/
├── api/                    # API services and types
│   ├── auth/              # Authentication services
│   └── config.ts          # API configuration
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── data/                 # Mock data and constants
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── pages/                # Page components
├── types/                # TypeScript type definitions
└── main.tsx             # Application entry point
```

## 🎨 Customization

### Theming
The application uses CSS variables for theming. You can customize colors by modifying the theme configuration in `tailwind.config.ts`.

### Adding New Pages
1. Create a new page component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update the navigation in `src/components/layout/AppSidebar.tsx`

### Adding New Components
1. Create your component in the appropriate directory under `src/components/`
2. Export it from the component file
3. Import and use it in your pages

### Data Management
- Mock data is located in `src/data/mockData.ts`
- Replace with real API calls in the respective service files
- Update types in `src/types/index.ts` as needed

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Universal Dashboard
VITE_APP_VERSION=1.0.0
```

### API Integration
To integrate with a real backend:

1. Update `src/api/config.ts` with your API base URL
2. Replace mock services in `src/api/` with real API calls
3. Update authentication flow in `src/api/auth/authService.ts`
4. Modify data types in `src/types/index.ts` to match your API

## 📊 Component Examples

### StatsCard
```tsx
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Users } from 'lucide-react';

<StatsCard
  title="Total Users"
  value={1234}
  icon={Users}
  color="text-blue-500"
  trend={{ value: 12, isPositive: true }}
  description="Active users in the system"
/>
```

### DataTable
```tsx
import { DataTable } from '@/components/dashboard/DataTable';

<DataTable
  title="Users"
  description="Manage system users"
  columns={columns}
  data={users}
  searchable
  filterable
  exportable
  onRowClick={(row) => console.log('Row clicked:', row)}
/>
```

### ChartCard
```tsx
import { ChartCard } from '@/components/dashboard/ChartCard';

<ChartCard
  title="User Activity"
  description="Monthly user activity trends"
  data={chartData}
  type="line"
  onRefresh={() => console.log('Refresh chart')}
/>
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload the dist folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon library
- [React](https://reactjs.org/) for the amazing frontend library

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainers

---

**Happy Coding! 🎉**# react-universal-dashboard
