# Product Management Backend

A backend service for managing a product catalog. Built with Node.js, Express, and Prisma, this API provides a complete solution for listing, searching, filtering, and uploading products from a CSV file.

## ✨ Features

* **List Products:** Fully paginated endpoint to browse all products.
* **Search & Filter:** search endpoint to filter by `brand`, `color`, `minPrice`, and `maxPrice`.
* **CSV Bulk Upload:** Endpoint to upload and process a CSV file to add products.
* **Input Validation:** validation to handle invalid filters and inputs gracefully(using ZOD).

## 🚀 Tech Stack

* **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (or your specific SQL database)
* **Testing:** [Jest](https://jestjs.io/), [Supertest](https://github.com/ladjs/supertest)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_GITHUB_USERNAME]/product-backend.git
    cd product-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Your `.env` file (which is git-ignored) must contain the database connection string. Create a `.env` file in the root and add your `DATABASE_URL`:
    ```env
    # .env
    # Example for PostgreSQL:
    DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DB_NAME?schema=public"
    ```

4.  **Run database migrations:**
    Prisma needs to sync your schema with the database.
    ```bash
    npx prisma migrate dev
    ```

## ▶️ Running the Application

Once setup is complete, you can start the development server:

```bash
npm run dev
```

(If you don't have a `dev` script, use `npm start` or whatever your primary script is). The server will typically start on `http://localhost:3000(here 8000)`.

## 📖 API Endpoints

Here are the main API routes available:

---

### 1. List Products (with Pagination)

Fetches a paginated list of all products.

* **URL:** `/products`
* **Method:** `GET`
* **Query Params:**
    * `page` (number, optional, default: 1): The page number to retrieve.
    * `limit` (number, optional, default: 10): The number of items per page.
* **Example Request:**
    `GET /products?page=2&limit=5`
* **Success Response (200 OK):**
    ```json
    {
      "page": 2,
      "limit": 5,
      "total": 100,
      "products": [
        { "id": 6, "name": "Product 6", "price": 150, ... },
        { "id": 7, "name": "Product 7", "price": 200, ... },
        ...
      ]
    }
    ```

---

### 2. Search & Filter Products

Fetches a list of products based on one or more filters.

* **URL:** `/products/search`
* **Method:** `GET`
* **Query Params:**
    * `brand` (string, optional): Filter by brand name (case-insensitive contains).
    * `color` (string, optional): Filter by color (case-insensitive contains).
    * `minPrice` (number, optional): Filter for products with a price greater than or equal to this value.
    * `maxPrice` (number, optional): Filter for products with a price less than or equal to this value.
* **Example Request:**
    `GET /products/search?brand=Nike&minPrice=50&maxPrice=150`
* **Success Response (200 OK):**
    ```json
    [
      { "id": 42, "name": "Nike Air", "brand": "Nike", "price": 120, "color": "Red" },
      { "id": 55, "name": "Nike React", "brand": "Nike", "price": 140, "color": "Blue" }
    ]
    ```
* **Error Response (400 Bad Request):**
    If a price filter is not a valid number.
    ```json
    {
      "error": "Invalid minPrice. Must be a number."
    }
    ```

---

### 3. Upload Products from csv file

Upload a CSV file to create multiple products at once.

* **URL:** `/upload`
* **Method:** `POST`
* **Form-Data:**
    * `file`: The CSV file to be uploaded.
* **Success Response (200 OK):**
    ```json
    {
      "message": "Upload successful",
      "productsCreated": 25
    }
    ```

## 🧪 Running Tests

To run the automated test suite (using Jest):

```bash
npm test
```

This will execute all test files in the `tests/` directory and ensure the API endpoints and logic are working as expected.
