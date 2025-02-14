
# Employee Directory

## Overview

This project is an Employee Directory web application that fetches employee data from an external API and displays it in a user-friendly interface. It includes a search functionality to filter employees by name and a modal window to display additional employee details.

## Technologies Used

-   **HTML**: Structure of the web page
-   **CSS**: Styling and layout
-   **JavaScript**: Dynamic functionality and API handling
-   **Public API**: [Random User API](https://randomuser.me/) to generate employee data

## Features

-   Fetches and displays 12 employee profiles from the API
-   Search functionality to filter employees by name
-   Clickable employee cards to view additional details in a modal window
-   Modal navigation to browse through employees
-   Responsive design for various screen sizes

## File Structure

-   `index.html` - Main HTML structure of the application
-   `styles.css` - Styling for the employee directory
-   `scripts.js` - JavaScript functionality for fetching data, displaying employee cards, and handling user interactions

## API Integration

-   The application fetches employee data from `https://randomuser.me/api/?results=12`.
-   Data includes name, email, location, phone number, and birthday.
-   The modal displays additional details including the full address and formatted date of birth.

## CSS Improvements

-   The following updates have been made to the template CSS file to improve readability and contrast:
	- Google Fonts: Caudex, Mouse Memoirs, and Noto Sans (https://fonts.google.com/share?selection.family=Caudex:ital,wght@0,400;0,700;1,400;1,700%7CMouse%20Memoirs%7CNoto%20Sans:ital,wght@0,100..900;1,100..900) 
	- Updated colors, box shadow and sizing for the elements within the Card and Modal elements

## Acknowledgments

This project was built using the [Random User API](https://randomuser.me/) to generate mock employee data.
The README file was written based on a template from ChatGPT and reviewed for accuracy.