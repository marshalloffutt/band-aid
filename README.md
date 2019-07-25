# Band ★ Aid
A networking platform connecting bands with talented musicians. This is my full-stack capstone
project at Nashville Software School.

## Screenshots
Authentication
![Authentication](/BandAid/images/auth.png)

Registration
![Regitration](/BandAid/images/register.png)

Home
![Home](/BandAid/images/home.png)

Bands View
![Bands](/BandAid/images/bands.png)

Single Band View
![Single](/BandAid/images/single-band.png)

Postings View
![Posting](/BandAid/images/postings.png)

## Technologies Used
* C#
* ASP.Net
* React
* Reactstrap
* Bootstrap
* Sass
* MVC
* Dapper
* Axios
* Create-React-App

## Entity Relationship Diagram
![ERD](/BandAid/images/bandaid_erd.png)

## How to run this app
Note: To run this app you will need a firebase account and a new project.

### 1. Configure Firebase, and seed the data
1. Clone the repository to your local machine.
2. Run the following command in terminal to download the web dependencies: `npm install`
3. In the db folder, rename apiKeys.json.example to apiKeys.json.
4. In Firebase, create a new project.
5. Navigate to your config object, and copy the keys from Firebase into the apiKeys.json file.
6. Create a realtime database in Firebase, and start in test mode.
7. Navigate to the Data tab inside the realtime database, and import cohort.json.
8. Run the included data script in your preferred SQL management tool.

### 2. Serve up the app
#### `npm start`

## Contributers
* [Marshall Offutt](https://github.com/marshalloffutt)
* [Nathan Gonzalez](https://github.com/copypastedeveloper) (mentor)
