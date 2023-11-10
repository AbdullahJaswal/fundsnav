# FundsNav

<!-- add image -->

![Home- FundsNav](./support/home-dark.png)

FundsNav (https://fundsnav.com) - High Performance Mutual Funds Analysis Platform with over 200+ listed funds of all the asset management companies present in Pakistan.

Provides a detailed analysis of funds with the following features:

- Fund Performance
- Fund Comparison
- Fund Ranking

![login - FundsNav](./support/login-dark.png)
![Dashboard - FundsNav](./support/dashboard-dark.png)
![Fund - FundsNav](./support/fund-dark.png)

### Full Stack application made using:

Backend: Django Rest (Python)
<br/>
Frontend: Next.js (React.js, Tailwind CSS)
<br/>
DB: PostgreSQL

With daily updates of funds data through python scripts written on AWS Lambda (scraps and inserts into db from https://www.mufap.com.pk/) and cached on a low latency Redis instance.

##### Deployed on AWS ECS (Elastic Container Service) using AWS Copilot (https://aws.github.io/copilot-cli/)
