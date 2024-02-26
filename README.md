# Angular Fetch Data Component

## Overview

This Angular component, `FetchDataComponent`, is designed to fetch and display weekly adjusted time series data for a specified symbol (in this case, IBM) from the Alpha Vantage API. The fetched data includes open, high, low, close prices, and volume for each week.

## Functionality

- The component fetches data from the Alpha Vantage API using the provided URL.
- Upon successful retrieval, the `processData` method is invoked to transform and store the relevant information in the `apiData` array.
- The data can be accessed for display or further processing in the Angular app.

## Technologies Used

- **Angular**: A TypeScript-based open-source web application framework used for building dynamic single-page applications.
- **HTML and CSS**: Used for structuring and styling the component's view.
- **TypeScript**: A superset of JavaScript, adding static types for enhanced development and maintainability.

## Usage

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Build and launch solution

## Code Overview

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./styles.css'] // Reference the CSS file
})
export class FetchDataComponent implements OnInit {
  apiData: any[] = []; // Initialize an empty array to store API data

  constructor() { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const queryUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=demo";

    fetch(queryUrl)
      .then(response => response.json())
      .then(data => this.processData(data)) // Update to call processData
      .catch(error => console.error("Error fetching data:", error));
  }

  processData(data: any) {
    if (data && data["Weekly Adjusted Time Series"]) {
      const weeklyData = data["Weekly Adjusted Time Series"];
      const apiData = [];

      for (const date in weeklyData) {
        const entry = weeklyData[date];
        apiData.push({
          date: date,
          open: entry["1. open"],
          high: entry["2. high"],
          low: entry["3. low"],
          close: entry["4. close"],
          volume: entry["6. volume"]
        });
      }

      this.apiData = apiData; // Store API data in the component property
    }
  }
}
