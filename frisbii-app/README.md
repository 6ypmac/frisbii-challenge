# Frisbii Customer Management App

This project implements a small customer dashboard that allows viewing customers, their invoices, and subscriptions.

The application is built with **Angular**, using **Signals-based state management** and **standalone components**.

---

## Features

### Customers List

Displays a list of customers including:

- customer handle
- email address

Each customer links to a detailed customer page.

---

### Customer Details

Displays detailed information about the selected customer:

- full name
- email
- company
- creation date

---

### Invoices

Shows invoices belonging to the selected customer.

Displayed fields:

- invoice handle
- state
- amount
- currency
- creation date

---

### Subscriptions

Shows subscriptions belonging to the selected customer.

Displayed fields:

- subscription handle
- state
- plan
- creation date

Subscriptions can be:

- paused
- unpaused

The UI disables the action button while the request is in progress.

---

## Architecture

The project follows a **feature-based architecture**:

```text
src/app/features
├─ customers
├─ invoices
└─ subscriptions
```

Each feature contains:

- service (API communication)
- store (state management)
- UI components

The `CustomerDetailComponent` acts as a **composition component**, combining the different feature components.

---

## State Management

State is managed using **Angular Signals**.

Each feature exposes a small store responsible for:

- loading state
- error handling
- storing fetched data
- performing actions

Example stores:

- `CustomersStore`
- `InvoicesStore`
- `SubscriptionsStore`

This keeps the components simple and focused on rendering.

---

## Data Loading

Data is fetched using Angular `HttpClient`.

Each store exposes signals such as:

- `loading`
- `error`
- data signals

The UI reacts to these signals to render:

- loading states
- error states
- empty states

---

## Routing

The application uses Angular Router.

Routes:

```bash
/customers
/customers/:handle
```

---

## Performance Considerations

The UI uses Angular's modern control flow syntax:

```bash
@if
@for
```

Lists use `track` to avoid unnecessary re-renders:

```bash
@for (invoice of invoices(); track invoice.handle)
```

---

## Pagination

The API supports pagination via the `size` parameter.

For simplicity, the UI currently loads the first page only.

Example request:

```bash
/v1/list/invoice?customer=cust-0100&size=20
```

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Open the application in the browser:

```bash
http://localhost:4200
```

---

## Possible Improvements

Possible future enhancements include:

- full pagination support
- sorting and filtering
- improved UI styling
- global error handling

---

## Technologies

- Angular
- Angular Signals
- Angular Standalone Components
- Angular Router
- TypeScript
- RxJS
- HttpClient
