import * as React from "react";
import {
  Outlet,
  Link,
  useNavigate,
  useParams,
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
  redirect,
  Navigate,
} from "react-router-dom";
import { Dialog } from "@mui/material";

import { IMAGES, Image, async_getAllImages, getImageById } from "./images";
import ErrorPage from "./routes/ErrorPage";
//loader
import { imageLoader, rootLoader } from "./routes/root";
import { iterate } from "localforage";
import ErrorImagePage from "./routes/ErrorImagePage";
import Login from "./components/Login/Login";
import SkeletonImage from "./components/Skeleton/SkeletonImage";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            // index: true,
            path: '/',
            Component: Home,
          },
          {
            path: "gallery",
            Component: Gallery,
            // loader: rootLoader,
            children: [
              {
                path: "img/:id",
                Component: ImageView,
                loader: imageLoader,
              },
            ],
          },
        ]
      }
    ],
  },
  {
    path: '/login',
    Component: Login
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}

export function Layout() {
  return (
    <div>
      <h1 className="text-red-500">Outlet Modal Example</h1>
      <p>
        This is a modal example using createBrowserRouter that drives modal
        displays through URL segments. The modal is a child route of its parent
        and renders in the Outlet.
      </p>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/#">Home</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>
        </nav>
        <hr />
      </div>
      <Outlet />
    </div>
  );
}

export function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>
        Click over to the <Link to="/gallery">Gallery</Link> route to see the
        modal in action
      </p>
      <Outlet />
    </div>
  );
}
interface LoaderData {
  images: Image[];
}
export function Gallery() {
  // const { images } = useLoaderData() as LoaderData;
  const [loaing, setLoading]= React.useState<boolean>(true)
  const [images, setImages]= React.useState<Image[]>([])
  const [error, setError]= React.useState(null)


  
  const navigate= useNavigate()
  React.useEffect(()=>{
    rootLoader().then(({images})=>{
      setImages(images)
      setError(null)
      setLoading(false)
    }).catch((error: any)=>{
      setError(error?.message ?? 'Error data')
    })
  },[])

  if(loaing){
    return <SkeletonImage></SkeletonImage>
  }
  return (
    <div style={{ padding: "0 24px" }}>
      {error && <div>Error {error}</div>}
      <h2>Gallery</h2>
      <p>
        Click on an image, you'll notice that you still see this route behind
        the modal. The URL will also change as its a child route of{" "}
        <pre style={{ display: "inline" }}>/gallery</pre>{" "}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
        }}
      >
        {images.map((image: Image) => (
          <Link key={image.id} to={`img/${image.id}`}>
            <img
              width={200}
              height={200}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                height: "auto",
                borderRadius: "8px",
              }}
              src={image.src}
              alt={image.title}
            />
          </Link>
        ))}
        <Outlet />
      </div>
      <button
        onClick={() => {
          navigate('/')
        }}
      >
        Log out
      </button>
      <button
        onClick={() => {
          navigate('/login')
        }}
      >
        Log in
      </button>
    </div>
  );
}

export function ImageView() {
  let navigate = useNavigate();
  let params = useParams();
  // let image = getImageById(Number(id));
  let buttonRef = React.useRef<HTMLButtonElement>(null);
  const { image } = useLoaderData() as { image: Image };

  function onDismiss() {
    navigate(-1);
  }

  console.log("id ", params);
  
  // if (!image) {
  //   throw new Error(`No image found with id: ${id}`);
  // }

  return (
    <Dialog open aria-labelledby="label" onClose={onDismiss}>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          padding: "8px 8px",
        }}
      >
        <h1 id="label" style={{ margin: 0 }}>
          {image.title}
        </h1>
        <img
          style={{
            margin: "16px 0",
            borderRadius: "8px",
            width: "100%",
            height: "auto",
          }}
          width={400}
          height={400}
          src={image.src}
          alt=""
        />
        <button
          style={{ display: "block" }}
          ref={buttonRef}
          onClick={onDismiss}
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
