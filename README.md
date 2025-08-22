# STB Digital - Complaints Dashboard

This is a web application for Société Tunisienne de Banque (STB) to monitor and analyze customer complaints from various digital channels. The application provides a comprehensive dashboard with visualizations and analytics to help the digital development team understand and act on customer feedback.

## Features

*   **Comprehensive Dashboard:** View key performance indicators (KPIs) for customer complaints, including total complaints, resolved cases, pending cases, average resolution time, and customer satisfaction.
*   **Complaint Analysis:** Visualize the distribution of complaints by channel (Mobile App, Internet Banking, ATM), by nature of the problem, and by severity (critical, medium, low).
*   **Trend Analysis:** Track monthly trends for new complaints and their resolution, as well as the evolution of customer satisfaction over time.
*   **Performance Monitoring:** Analyze the performance of each digital channel in handling complaints, including resolution rates, average resolution time, and satisfaction scores.
*   **Responsive Design:** The application is fully responsive and provides a seamless experience on both desktop and mobile devices.
*   **Intuitive Navigation:** A sidebar provides easy access to all sections of the application, including the main dashboard, detailed channel views, and management sections.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) 15
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Framework:** [React](https://react.dev/) 19
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) for accessible components and [Lucide Icons](https://lucide.dev/) for icons.
*   **Charting:** [Recharts](https://recharts.org/) for creating interactive charts.
*   **HTTP Client:** [Axios](https://axios-http.com/) for making API requests.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (version 20 or higher)
*   npm

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/your_repository.git
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Run the development server**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

**Note:** The application expects a backend server to be running at `http://localhost:8000` to fetch some of the analytics data.

## Project Structure

The project follows the standard Next.js App Router structure:

*   `src/app/`: Contains the main pages of the application.
    *   `layout.tsx`: The root layout of the application.
    *   `page.tsx`: The main dashboard page.
    *   `channels/`: Contains pages for specific digital channels.
*   `src/components/`: Contains reusable React components.
    *   `ui/`: Contains UI components built with Radix UI and Tailwind CSS.
    *   `banking-layout.tsx`: The main layout component that includes the sidebar, header, and footer.
*   `src/hooks/`: Contains custom React hooks.
*   `src/lib/`: Contains utility functions.
*   `public/`: Contains static assets like images and fonts.

## Data Sources

The application fetches data from two main sources:

1.  **Local JSON File:** A local `analytics-db.json` file located in the `public` directory is used to provide baseline analytics data. This allows the application to work even when the backend is not available.
2.  **API Endpoint:** The application makes a request to `http://localhost:8000/all-rapports` to fetch the latest analytics data from the backend. The data from the API is merged with the local data to provide the most up-to-date information.

## Deployment

To create a production-ready build of the application, run the following command:

```sh
npm run build
```

This will create an optimized build in the `.next` directory. To start the production server, run:

```sh
npm run start
```
This will start the server on the default port `3000`.
