import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWLVWeIVSX2Vd7f7Uv6fysM7Eyk3DQ4Bo",
  authDomain: "vtu-gps.firebaseapp.com",
  databaseURL:
    "https://vtu-gps-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vtu-gps",
  storageBucket: "vtu-gps.appspot.com",
  messagingSenderId: "997539683663",
  appId: "1:997539683663:web:ff900fdf0b80dd151b793a",
  measurementId: "G-ZKB2ZJF3FV",
};
initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase();

// Initial coordinates
let lat = 1297.16; // Bangalore latitude
let lng = 7759.46; // Bangalore longitude

// Function to generate random coordinates within a certain range
function generateRandomCoordinates() {
  // Change these values to adjust the range of movement
  const latRange = 0.1;
  const lngRange = 0.1;

  lat += latRange;
  lng += lngRange;
  return { lat, lng };
}

// Function to send coordinates to Firebase
function sendCoordinates() {
  const coordinates = generateRandomCoordinates();

  set(ref(database, "LAT"), coordinates.lat.toFixed(4))
    .then(() => {
      console.log("Latitude saved successfully!");
    })
    .catch((error) => {
      console.error("Latitude could not be saved." + error);
    });

  set(ref(database, "LNG"), coordinates.lng.toFixed(4))
    .then(() => {
      console.log("Longitude saved successfully!");
    })
    .catch((error) => {
      console.error("Longitude could not be saved." + error);
    });
}

// Send coordinates every second
setInterval(sendCoordinates, 5000);
