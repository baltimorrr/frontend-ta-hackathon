import AuthGuard from 'guards/AuthGuard'
import GuestGuard from 'guards/GuestGuard'
import Layout from 'layouts'
import ChartPage from 'pages/ChartPage'
import ChatPage from 'pages/ChatPage'
import { HomePage } from 'pages/HomePage'
import ListPage from 'pages/ListPage'
import LoginPage from 'pages/LoginPage'
import { useRoutes } from 'react-router-dom'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: 'login',
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: 'chat',
      element: (
        <AuthGuard>
          <Layout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <ChatPage />
          ),
        },
      ],
    },
    {
      path: 'chart',
      element: (
        <AuthGuard>
          <Layout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
                         <ChartPage />

          ),
        },
      ],
    },
    {
      path: 'list',
      element: (
        <AuthGuard>
          <Layout />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
              <ListPage />
          ),
        },
      ],
    },
  ])
}
