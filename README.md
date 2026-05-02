# VectorShift Frontend Technical Assessment

This repository contains my submission for the VectorShift frontend technical assessment. The project is a full-stack pipeline builder application built with a React frontend and a FastAPI backend.

## Project Overview

The assessment requirements have been successfully completed across all four parts. Below is a summary of the implemented features:

* **Part 1: Node Abstraction**
  I developed a centralized `BaseNode` component to simplify the creation of new nodes. This abstraction allows new nodes to be added using a straightforward configuration object. To demonstrate its flexibility, I implemented five new custom nodes: Filter, API Request, Timer, Merge, and Note.

* **Part 2: UI Styling**
  The application features a fully redesigned, premium user interface. It utilizes a modern dark theme with refined color palettes, subtle gradients, and smooth transition animations to ensure a polished user experience.

* **Part 3: Dynamic Text Node**
  The Text node has been enhanced with dynamic functionality. It automatically adjusts its dimensions based on the user's input. Additionally, when a user defines a variable using double curly brackets (e.g., `{{ my_variable }}`), the node automatically generates a corresponding input handle on its left side.

* **Part 4: Backend Integration**
  The frontend is fully integrated with the provided FastAPI backend. Clicking the "Submit Pipeline" button transmits the current pipeline state (nodes and edges) to the backend. The server then calculates the total number of nodes and edges, and verifies whether the pipeline forms a valid Directed Acyclic Graph (DAG). The results are displayed to the user via a clean, non-intrusive modal overlay.

## Installation and Setup

To run this application locally, please follow the steps below:

### 1. Start the Backend
Open a terminal, navigate to the `backend` directory, and start the server:
```bash
cd backend
uvicorn main:app --reload
```
*(Note: Ensure you have `fastapi` and `uvicorn` installed. The server will run on `http://localhost:8000`)*

### 2. Start the Frontend
Open a separate terminal, navigate to the `frontend` directory, install the dependencies, and start the development server:
```bash
cd frontend
npm install
npm start
```
*(The application will run on `http://localhost:3000`)*

## Technology Stack
* **Frontend:** React, React Flow, Zustand, Vanilla CSS
* **Backend:** Python, FastAPI

Thank you for your time and consideration in reviewing this assessment.
