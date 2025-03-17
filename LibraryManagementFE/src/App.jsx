import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./component/AppLayout/AppLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/User-Auth/Login";
import { Register } from "./pages/User-Auth/Register";
import { Book } from "./pages/Book";
import { ErrorPage } from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "../AuthContextStore";
import { Logout } from "./pages/User-Auth/Logout";
import { AdminLayout } from "./pages/Admin/AdminLayout";
import { AdminUser } from "./pages/Admin/AdminUser";
import { AdminAuthor } from "./pages/Admin/AdminAuthor";
import { AdminUserUpdate } from "./pages/Admin/AdminUserUpdate";

import { AdminAuthorUpdate } from "./pages/Admin/AdminAuthorUpdate";
import { AdminBook } from "./pages/Admin/AdminBook";

import { AdminContacts } from "./pages/Admin/AdminContacts";
import { BookDetails } from "./pages/BookDetails";
import { AdminBookUpdate } from "./pages/Admin/AdminBookUpdate";

// const { getBookDetails } = useAuth();

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },

      { path: "/books", element: <Book /> },
      { path: "/book/:id", element: <BookDetails /> },

      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/logout", element: <Logout /> },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "users", element: <AdminUser /> },
          { path: "user/update/:id", element: <AdminUserUpdate /> },

          { path: "authors", element: <AdminAuthor /> },
          { path: "author", element: <AdminAuthorUpdate /> },

          { path: "books", element: <AdminBook /> },
          { path: "book", element: <AdminBookUpdate /> },

          { path: "contacts", element: <AdminContacts /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={route} />;
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          bodyClassName="toastBody"
        />
      </AuthProvider>
    </>
  );
};

export default App;
