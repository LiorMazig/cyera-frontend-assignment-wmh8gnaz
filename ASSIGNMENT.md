# Scans Heatmap — Frontend Assignment

One of the primary things we do at Cyera is scanning data inside Cloud Assets 🙂

In this exercise, we will aim to create a Heatmap representing scans that Cyera operated against Cloud Providers for a specific customer.

## Definitions

- **Scan** = operation in which Cyera searches for Data in one/many assets
- **Cloud Provider** = a Cloud Vendor, hosting Cloud Assets (e.g., AWS, GCP…)

## Heatmap

The heatmap is relative to the maximum number of scans per day (in the last year) — with jumps of 25% (= in other words, five different colors).

### Step 1: Implement the Heatmap

What do we see here:

- Each row represents a month.
  - The first row refers to January.
  - The 12th row (if it exists) refers to December.
- Each box represents the day of the month.
  - The maximum number of boxes in a row is 31 (maximum days a month). It could be less! (e.g. February 28th/29th)

The last box should always be **yesterday**; no box should be visible after it. Explanation:

- In the example (screenshot taken on March 10), you can see:
  - 9 boxes — as March 10 was the date of the screenshot
  - 3 rows — as we're still in March, on that screenshot time
- You should render a box for each day (even if this is a day without any scan).

The more "Purple" the color — the more scans Cyera operated on that date. The way to colorize each box should represent the following logic:

| Scan count per day (x)                    | Color                          |
| ----------------------------------------- | ------------------------------ |
| x = 0 scans                               | Dark grey (`color1`)           |
| 0 < x <= 25% of maximum daily scans       | Dark purple (`color2`)         |
| 25% < x <= 50% of maximum daily scans     | Purple (`color3`)              |
| 50% < x <= 75% of maximum daily scans     | Light purple (`color4`)        |
| 75% < x <= 100% of maximum daily scans    | Very light purple (`color5`)   |

Calculate the maximum daily scans based on the **visible days**. Avoid referencing dates earlier than the displayed year or dates in the future.

For example, if we display only the scans of 2023, the maximum should be based on the days between Jan 1, 2023, and the end of the year. If we display the current year, the maximum should be calculated from Jan 1 until yesterday.

#### Recommendation: Tooltip

If you hover over a specific day, a tooltip will appear showing how many scans were conducted on that day. It can be helpful for debugging.

### Step 2: Year Picker

Implement the year picker (display the relevant date).

### Step 3: Cloud Provider Filter

Implement the cloud providers filter (show just scans of the selected cloud providers).

This filter should support multi-selection. For example, you can select AWS and Azure.

### Step 4: Error Handling + Loading UI Enhancement

Extend the UI to gracefully handle API errors. Display a user-friendly message if the `/api/scans` data fetch fails, and add a **retry** button to trigger a new data fetch.

How would that error placeholder look? — Up to your taste.

For your convenience, to test errors, you can change the environment variable `ENVIRONMENT=production` in the `.env` file, which will cause errors to be returned randomly (`RANDOM_ERRORS_CHANCE=0.5`). See `random-error.middleware.ts` for reference.

### Step 5: Add a Legend

Add a legend with an "on hover" behavior so that whenever a certain level is hovered, all the relevant boxes with the same level should be highlighted.

### Step 6: Light Mode

Let's add a light mode button so that the user can change the heatmap's color scheme.

The background color should change to a bright one (white), and the color schema should change to a different color (of your choice).

## Additional Notes

- External libraries can be added. With that being said, completing the exercise with the already provided libraries should be enough and doesn't require any additions. If you do think of adding extra ones, consider them carefully if needed.
- Default state when no filters are assigned: current year with all cloud providers.

## Code Skeleton (Stackblitz)

To start, we'll be working with a Fullstack Skeleton code which we provide you here:

Stackblitz: https://stackblitz.com/edit/cyera-frontend-assignment

The skeleton includes:

1. **Client (React)**
   - Includes `<YearPicker />` and `<CloudProviderSelect />` components.
   - All colors for the boxes are part of `style.css` (`color1`, `color2`, …, `color5`).
   - `constants.ts` file.
   - `http-client.ts` — an axios instance for making api calls. The base URL (`localhost:3000`) is already configured so you only need to import it and pass the api URL. For example: `axiosInstance.get('/api/scans')`.
2. **Server (ExpressJS)**
   - The server is already implemented for you, with 2 endpoints:
     - `GET /api/scans`
     - `GET /api/cloud-providers`
   - For the full documentation of these endpoints, please refer to the 2nd PDF.

Once you start editing, the project will be forked. It is recommended to sign in to a GitHub account. Otherwise, you will lose all progress if the browser gets stuck. To create an additional terminal in Stackblitz, click the `+` button in the top right corner of the already-existing terminal.

To run the project, open two terminals on the root level, and execute:

- `npm run client`
- `npm run server`

**Good luck!**
