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
